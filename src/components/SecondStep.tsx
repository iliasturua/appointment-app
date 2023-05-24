import { Button, DatePicker, Form } from "antd";
import { Appointment } from "../types/appointment.types";

export interface InputProps {
  appointment: Appointment;
  setAppointment: React.Dispatch<React.SetStateAction<Appointment>>;
  handlePrevStep: () => void;
  handleSubmit: () => Promise<void>;
}

const SecondStep = (props: InputProps) => {
  const { appointment, setAppointment, handlePrevStep, handleSubmit } = props;

  const handleDateTimeChange = (dateTime: any) => {
    setAppointment({
      ...appointment,
      dateTime: dateTime ? dateTime.format("YYYY-MM-DD HH:mm:ss") : null,
    });
  };
  return (
    <>
      <Form.Item
        label="Date and Time"
        name="dateTime"
        rules={[{ required: true }]}
      >
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          onChange={handleDateTimeChange}
        />
      </Form.Item>
      <Form.Item>
        <Button onClick={handlePrevStep}>Previous</Button>
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form.Item>
    </>
  );
};

export default SecondStep;
