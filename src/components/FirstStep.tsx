import { Button, Form, Input } from "antd";
import { Appointment } from "../types/appointment.types";

export interface InputProps {
  appointment: Appointment;
  setAppointment: React.Dispatch<React.SetStateAction<Appointment>>;
  handleNextStep: () => void;
}

const FirstStep = (props: InputProps) => {
  const { appointment, setAppointment, handleNextStep } = props;
  return (
    <>
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true }]}
      >
        <Input
          data-testid="firstName"
          value={appointment.firstName}
          onChange={(e) =>
            setAppointment({ ...appointment, firstName: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
        <Input
          data-testid="lastName"
          value={appointment.lastName}
          onChange={(e) =>
            setAppointment({ ...appointment, lastName: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, type: "email" }]}
      >
        <Input
          data-testid="email"
          value={appointment.email}
          onChange={(e) =>
            setAppointment({ ...appointment, email: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleNextStep}>
          Next
        </Button>
      </Form.Item>
    </>
  );
};

export default FirstStep;
