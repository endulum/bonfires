import { useNavigate } from "react-router-dom";
import { Form } from "../../reusable/Form";
import { InputChecklist } from "../../reusable/InputChecklist";

export function NewChannel() {
  const navigate = useNavigate();
  return (
    <Form
      destination={{ endpoint: "/channels", method: "POST" }}
      onSuccess={(_submissionData, submissionResult) => {
        navigate(`/camp/${(submissionResult as { _id: string })._id}`);
      }}
      buttonText="Create"
    >
      <p>
        A camp lets you share messages with others. Get started by choosing a
        name for your camp.
      </p>
      <label htmlFor="title">
        <span>Camp name</span>
        <InputChecklist
          input={<input type="text" id="title" required />}
          requirements={[
            {
              description: "Must be between 2 and 32 characters long",
              function: (value) => value.length >= 2 && value.length <= 32,
            },
          ]}
        />
      </label>
    </Form>
  );
}
