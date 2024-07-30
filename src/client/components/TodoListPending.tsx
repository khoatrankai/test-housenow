import { useEffect, useState, type SVGProps } from 'react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import { api } from '@/utils/client/api'

export const TodoListPending = () => {
  const { data: todos = [] }: any = api.todo.getAll.useQuery({
    statuses: ['completed', 'pending'],
  })
  const [animationParent] = useAutoAnimate()
  const [dataCheck, setDataCheck] = useState([])
  const apiContext = api.useContext()
  const { mutate: updateTodo, isLoading: isCreatingTodoUpdate } =
    api.todoStatus.update.useMutation({
      onSuccess: () => {
        apiContext.todo.getAll.refetch()
      },
    })
  const { mutate: deleteTodo, isLoading: isCreatingTodoDelete } =
    api.todo.delete.useMutation({
      onSuccess: () => {
        apiContext.todo.getAll.refetch()
      },
    })
  useEffect(() => {
    setDataCheck(
      todos.filter((dt: any) => {
        return dt.status !== 'completed'
      })
    )
  }, [todos])
  const handleUpdate = (id: number, statuss: string) => {
    updateTodo({ status: 'completed', todoId: id })
  }

  return (
    <ul className="grid grid-cols-1 gap-y-3" ref={animationParent}>
      {dataCheck.map((todo: any) => (
        <li key={todo.id}>
          <div
            className={`flex items-center justify-between rounded-12 border border-gray-200 px-4 py-3 shadow-sm`}
          >
            <div className="flex items-center ">
              <Checkbox.Root
                id={String(todo.id)}
                defaultChecked={false}
                onCheckedChange={() => {
                  handleUpdate(todo.id, todo.status)
                }}
                className="flex h-6 w-6 items-center justify-center rounded-6 border border-gray-300 focus:border-gray-700 focus:outline-none data-[state=checked]:border-gray-700 data-[state=checked]:bg-gray-700"
              >
                <Checkbox.Indicator>
                  <CheckIcon className="h-4 w-4 text-white" />
                </Checkbox.Indicator>
              </Checkbox.Root>

              <label
                className={`block pl-3 font-medium`}
                htmlFor={String(todo.id)}
              >
                {todo.body}
              </label>
            </div>
            <div>
              <XMarkIcon
                className="h-6 w-6"
                onClick={() => {
                  deleteTodo({ id: todo.id })
                }}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

const XMarkIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )
}

const CheckIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  )
}
