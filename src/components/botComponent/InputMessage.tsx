import { SubmitHandler, useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import responses from "../../utils/localDatas/data.json";
import { Message, Discussion } from "../../types/Discussion";
type inputMessageProps = {
  discussion: Discussion;
  setDiscussion: React.Dispatch<React.SetStateAction<Discussion>>;
};
const InputMessage = (props: inputMessageProps) => {
  const { register, handleSubmit, reset } = useForm<Message>();
  const { discussion, setDiscussion } = props;
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [userMessage, setUserMessage] = useState<string>("");

  const onSendMessage: SubmitHandler<Message> = (data) => {
    const UserMessage: Message = {
      Content: data.Content,
      Sender: {
        Name: "User",
      },
    };

    discussion.Messages.push(UserMessage);
    const disc: Discussion = {
      Messages: discussion.Messages,
    };
    setDiscussion(disc);
    reset({ Content: "" });
    setUserMessage(data.Content);

    setSubmitted(true);
  };
  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    for (const question of responses.questions) {
      const followUpMatch = question.followUpQuestion?.keywords?.some(
        (keyword: string) => lowerInput.includes(keyword)
      );

      if (followUpMatch) {
        return question.followUpQuestion.response;
      }
    }

    const foundResponse = responses.questions.find((q) =>
      q.keywords.some((keyword: string) => lowerInput.includes(keyword))
    );

    if (foundResponse) {
      const followUpSuggestions =
        foundResponse.followUpQuestion?.question || "";
      return `${foundResponse.response}\n\n${followUpSuggestions}`;
    } else {
      const clarifyingResponses = responses.clarifyingQuestions
        .map((clarifying) => {
          return `${clarifying.question} ${clarifying.response}`;
        })
        .join(" ");

      return (
        responses.defaultResponse.replace("{input}", input) +
        " " +
        clarifyingResponses
      );
    }
  };

  useEffect(() => {
    if (!submitted) return;

    const timer = setTimeout(() => {
      const botRespone = getBotResponse(userMessage);
      const botMessage: Message = {
        Content: botRespone,
        Sender: {
          Name: "Bot",
        },
      };
      {
        discussion.Messages.push(botMessage);
        const disc: Discussion = {
          Messages: discussion.Messages,
        };
        setDiscussion(disc);
      }
      setSubmitted(false);
      reset({ Content: "" });
    }, 1500);

    return () => clearTimeout(timer);

    setSubmitted(false);
  }, [submitted]);

  return (
    <form onSubmit={handleSubmit(onSendMessage)}>
      <div className="input-container">
        <input
          type="text"
          className="input-bar"
          placeholder="Enter your question here .."
          {...register("Content", { required: true })}
        />
        <button className="send-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M13,5.586l-4.707,4.707c-0.391,0.391-0.391,1.023,0,1.414s1.023,0.391,1.414,0L12,9.414V17c0,0.552,0.447,1,1,1   s1-0.448,1-1V9.414l2.293,2.293C16.488,11.902,16.744,12,17,12s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414L13,5.586z   " />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default InputMessage;
