<template>
  <div class="main-contents">
    <div class="message_base">
      <div v-for="message in messages" :key="message.id">
        <div :class="[message.owner === username ? 'message' : 'message_opponent']">
          {{ message.content }}
        </div>
        <div :class="[message.owner === username ? 'username' : 'username_opponent']">
          {{ message.owner }}&emsp;{{ formattedCreatedAt(message.createdAt) }}
        </div>
      </div>
    </div>
    <input
      class="message-input"
      placeholder="Enter a message (send with Shift+Enter)"
      v-model="content"
      @keydown.enter.shift="sendMessage"
    />
  </div>
</template>

<script setup lang="ts">
import { API, graphqlOperation } from '@aws-amplify/api'
import { createMessage } from '@/graphql/mutations'
import { listMessages } from '@/graphql/queries'
import { onCreateMessage } from '@/graphql/subscriptions'
import { ref, onBeforeUnmount, onUpdated, computed } from 'vue'
import type { ZenObservable } from 'zen-observable-ts'
import type { CreateMessageInput } from '@/API'

interface Message {
  id: string
  content: string
  owner: string
  createdAt: string
}

const props = defineProps<{
  username: string
}>()

const messages = ref<Message[]>([])
const content = ref('')
let subscription: ZenObservable.Subscription | undefined

const sendMessage = async (event: KeyboardEvent) => {
  if (event.key !== 'Enter' || !content.value) return

  const message: CreateMessageInput = {
    id: new Date().getTime() + props.username,
    content: content.value
  }

  // Mutation(createMessage) の実装
  try {
    await API.graphql(graphqlOperation(createMessage, { input: message }))
  } catch (error) {
    console.warn(error)
  }
  content.value = ''
}

const fetchMessages = async () => {
  try {
    // Query(listMessages) の実装
    const result = await API.graphql(graphqlOperation(listMessages, { input: 100 }))
    const data = 'data' in result ? result.data : result
    const items: Message[] = data.listMessages.items
    messages.value = items.sort((a: Message, b: Message) => (a.id > b.id ? 1 : -1))
  } catch (error) {
    console.warn(error)
  }
}

const subscribeToMessages = async () => {
  // Subscription(onCreateMessages) の実装
  subscription = (API.graphql(graphqlOperation(onCreateMessage)) as any).subscribe({
    next: (response: any) => {
      const newMessage = response.value.data.onCreateMessage as Message
      messages.value = [...messages.value, newMessage]
    },
    error: (error: any) => {
      console.warn(error)
    }
  })
}

const scrollBottom = () => {
  const container = document.querySelector('.message_base')
  container!.scrollTop = container!.scrollHeight
}

const formattedCreatedAt = computed(() => {
  return (createdAt: string) => {
    const date = new Date(createdAt)
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  }
})

onBeforeUnmount(() => {
  if (subscription) {
    // Subscription(onCreateMessages) の実装
    subscription.unsubscribe()
  }
})

onUpdated(() => {
  scrollBottom()
})

fetchMessages()
subscribeToMessages()
</script>
