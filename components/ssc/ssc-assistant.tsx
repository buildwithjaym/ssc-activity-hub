"use client";

import {
  useState,
} from "react";

import SSCButton from "./ssc-button";
import SSCChatWindow from "./ssc-chat-window";


type Message = {
  id: string;
  role: "user" | "ssc";
  content: string;
};


export default function SSCAssistant() {


  const [open, setOpen] = useState(false);


  const [typing, setTyping] = useState(false);


  const [messages, setMessages] = useState<Message[]>([]);



  async function sendMessage(
    text: string
  ) {

    if (!text.trim()) return;


    const userMessage: Message = {

      id: crypto.randomUUID(),

      role: "user",

      content: text,

    };


    setMessages((previous)=>[
      ...previous,
      userMessage,
    ]);


    setTyping(true);



    try {


      const response = await fetch(
        "/api/ssc-chat",
        {
          method:"POST",

          headers:{
            "Content-Type":
            "application/json",
          },

          body: JSON.stringify({
            message:text,
          }),

        }
      );



      const data = await response.json();



      const sscMessage: Message = {

        id: crypto.randomUUID(),

        role:"ssc",

        content:
        data.reply ??
        "Sorry, I could not answer that.",

      };



      setMessages((previous)=>[
        ...previous,
        sscMessage,
      ]);



    }

    catch(error){

      console.error(
        "SSC Error:",
        error
      );


      setMessages((previous)=>[

        ...previous,

        {

          id: crypto.randomUUID(),

          role:"ssc",

          content:
          "Sorry, SSC Assistant is unavailable right now. Please try again.",

        },

      ]);

    }


    finally {

      setTyping(false);

    }

  }





  return (

    <>

      {
        open && (

          <SSCChatWindow

            messages={messages}

            sendMessage={sendMessage}

            typing={typing}

            onClose={()=>
              setOpen(false)
            }

          />

        )
      }



      <SSCButton

        open={open}

        onClick={()=>
          setOpen(!open)
        }

      />


    </>

  );

}