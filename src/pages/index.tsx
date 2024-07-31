import * as Tabs from '@radix-ui/react-tabs'
import { useState } from 'react'

import { CreateTodoForm } from '@/client/components/CreateTodoForm'
import { TodoList } from '@/client/components/TodoList'
/**
 * QUESTION 6:
 * -----------
 * Implement quick filter/tab feature so that we can quickly find todos with
 * different statuses ("pending", "completed", or both). The UI should look like
 * the design on Figma.
 *
 * NOTE:
 *  - For this question, you must use RadixUI Tabs component. Its Documentation
 *  is linked below.
 *
 * Documentation references:
 *  - https://www.radix-ui.com/docs/primitives/components/tabs
 */

const Index = () => {
  const [checkActive, setCheckActive] = useState(1)

  return (
    <main className="mx-auto w-[480px] pt-12">
      <div className="flex flex-col items-center gap-10 rounded-12 bg-white p-8 shadow-sm">
        <h1 className="w-full text-center text-4xl font-extrabold text-gray-900">
          Todo App
        </h1>
        <Tabs.Root className=" flex w-full flex-col gap-10" defaultValue="tab1">
          <Tabs.TabsList className="flex gap-2">
            <Tabs.Trigger
              onClick={() => {
                setCheckActive(1)
              }}
              className={`rounded-full border-[1px] px-6 py-3 text-sm font-bold transition-all duration-500 ${
                checkActive === 1
                  ? 'border-gray-700 bg-gray-700 text-white'
                  : ' border-gray-200 text-gray-700'
              }`}
              value="tab1"
            >
              All
            </Tabs.Trigger>
            <Tabs.Trigger
              onClick={() => {
                setCheckActive(2)
              }}
              className={`rounded-full border-[1px] px-6 py-3 text-sm font-bold transition-all duration-500 ${
                checkActive === 2
                  ? 'border-gray-700 bg-gray-700 text-white'
                  : ' border-gray-200 text-gray-700'
              }`}
              value="tab2"
            >
              Pending
            </Tabs.Trigger>
            <Tabs.Trigger
              onClick={() => {
                setCheckActive(3)
              }}
              className={`rounded-full border-[1px] px-6 py-3 text-sm font-bold  transition-all duration-500 ${
                checkActive === 3
                  ? 'border-gray-700 bg-gray-700 text-white'
                  : ' border-gray-200 text-gray-700'
              }`}
              value="tab3"
            >
              Completed
            </Tabs.Trigger>
          </Tabs.TabsList>
          <Tabs.Content value="tab1">
            <TodoList typeTodo={'all'} />
          </Tabs.Content>
          <Tabs.Content value="tab2">
            <TodoList typeTodo={'pending'} />
          </Tabs.Content>
          <Tabs.Content value="tab3">
            <TodoList typeTodo={'completed'} />
          </Tabs.Content>
        </Tabs.Root>
        <div className=" w-full">
          <CreateTodoForm />
        </div>
      </div>
    </main>
  )
}

export default Index
