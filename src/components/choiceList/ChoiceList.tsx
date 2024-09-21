import { Button, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useQuestionnaire } from "../../api/QuestionService";

const ChoiceList: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { currentQuestion, handleAnswer, resultMessage } = useQuestionnaire();

  const handleDefautAnsewrSubmit = (data: any) => {
    handleAnswer(data.textQuestionAnswer);
  };
  const handleYesAnsewrSubmit = () => {
    handleAnswer("yes");
  };
  const handleNoAnsewrSubmit = () => {
    handleAnswer("no");
  };

  return (
    <Stack spacing={2} style={{ display: "flex", alignItems: "center" }}>
      {resultMessage}
      <div>
        {currentQuestion && currentQuestion.type === "text" && (
          <form onSubmit={handleSubmit(handleDefautAnsewrSubmit)}>
            <div>
              <Typography>{currentQuestion.text}</Typography>
              <input
                type="text"
                {...register("textQuestionAnswer", { required: true })}
              />
              {errors.inputValue && <span>This field is required</span>}
              <Button type="submit">Next</Button>
            </div>
          </form>
        )}
        {currentQuestion && currentQuestion.type === "multiple-choice" && (
          <form action="">
            <div>
              <Typography>{currentQuestion.text}</Typography>
              <Button onClick={handleSubmit(handleYesAnsewrSubmit)}>
                yes
              </Button>{" "}
              <Button onClick={handleSubmit(handleNoAnsewrSubmit)}>no</Button>
            </div>
          </form>
        )}
      </div>
    </Stack>
  );
};

export default ChoiceList;
