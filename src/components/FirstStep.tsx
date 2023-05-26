import { Button, Form, Input, message } from "antd";
import { Appointment } from "../types/appointment.types";

export interface InputProps {
  appointment: Appointment;
  setAppointment: React.Dispatch<React.SetStateAction<Appointment>>;
  handleNextStep: () => void;
}

const FirstStep = (props: InputProps) => {
  const { appointment, setAppointment, handleNextStep } = props;

  const validateFields = () => {
    const { firstName, lastName, email } = appointment;

    if (!firstName || !lastName || !email) {
      message.error("Please fill in all fields");
      return;
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      message.error("Email address format is invalid");
      return;
    }

    handleNextStep();
  };

  return (
    <>
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: "Please enter your first name" }]}
      >
        <Input
          data-testid="firstName"
          value={appointment.firstName}
          onChange={(e) => {
            setAppointment({ ...appointment, firstName: e.target.value });
          }}
        />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: "Please enter your last name" }]}
      >
        <Input
          data-testid="lastName"
          value={appointment.lastName}
          onChange={(e) => {
            setAppointment({ ...appointment, lastName: e.target.value });
          }}
        />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Invalid email address" },
        ]}
      >
        <Input
          data-testid="email"
          value={appointment.email}
          onChange={(e) => {
            setAppointment({ ...appointment, email: e.target.value });
          }}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={validateFields}>
          Next
        </Button>
      </Form.Item>
    </>
  );
};

export default FirstStep;
