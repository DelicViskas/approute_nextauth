"use client"
// import ErrorPage from "@/app/error";
// import Loading from "@/app/messages/loading";
// import { fetcher, messagesURL } from "@/swr/fetcher";
import { Messages } from "@prisma/client";
// import useSWR from "swr";
import MessageCard from "./MessageCard";

export default function MessageList() {
  // const {data, error, isLoading} = useSWR<Messages[]>(messagesURL, fetcher)
  const messages: Messages[] = [
    {
      id: 1,
      sender_ms: "user123",
      receiver_ms: "user456",
      text: "Привет! Как твои дела?",
      createdAt: new Date("2025-03-20T10:15:30Z"),
    },
    {
      id: 2,
      sender_ms: "user456",
      receiver_ms: "user123",
      text: "Привет! Все хорошо, спасибо. А у тебя?",
      createdAt: new Date("2025-03-20T10:17:45Z"),
    },
    {
      id: 3,
      sender_ms: "user123",
      receiver_ms: "user456",
      text: "Тоже все отлично. Чем занимаешься?",
      createdAt: new Date("2025-03-20T10:20:10Z"),

    },
    {
      id: 4,
      sender_ms: "user456",
      receiver_ms: "user123",
      text: "Смотрю новый сериал. А ты?",
      createdAt: new Date("2025-03-20T10:22:05Z"),

    },
    {
      id: 5,
      sender_ms: "user123",
      receiver_ms: "user456",
      text: "Читаю интересную книгу.",
      createdAt: new Date("2025-03-20T10:25:30Z"),

    },
    {
      id: 6,
      sender_ms: "user789",
      receiver_ms: "user123",
      text: "Привет! Ты сегодня свободен?",
      createdAt: new Date("2025-03-21T09:00:00Z"),

    },
    {
      id: 7,
      sender_ms: "user123",
      receiver_ms: "user789",
      text: "Да, свободен. Что планируешь?",
      createdAt: new Date("2025-03-21T09:05:15Z"),

    },
    {
      id: 8,
      sender_ms: "user789",
      receiver_ms: "user123",
      text: "Может, сходим в кино?",
      createdAt: new Date("2025-03-21T09:10:20Z"),

    },
    {
      id: 9,
      sender_ms: "user123",
      receiver_ms: "user789",
      text: "Отличная идея! Во сколько встречаемся?",
      createdAt: new Date("2025-03-21T09:15:00Z"),

    },
    {
      id: 10,
      sender_ms: "user789",
      receiver_ms: "user123",
      text: "Давай в 18:00 у входа в кинотеатр.",
      createdAt: new Date("2025-03-21T09:20:30Z"),
    },
  ];
  // if (isLoading) return <Loading />
  // if (error) return <ErrorPage  error={error}/>
  // if (!data?.length) 
  //   return <div className="center">
  //     <h3>Нет сообщений</h3>
  //   </div>
  return <>
      {messages?.map(mes =>
        <MessageCard key={mes.id} message={mes}/>
      )}
    </>
}