import { fireEvent, render, screen } from "@testing-library/react";
import FirstStep from "./FirstStep";
import { Form } from "antd";
import userEvent from "@testing-library/user-event";

describe("FirstStep", () => {
  beforeAll(() => {
    global.matchMedia =
      global.matchMedia ||
      function () {
        return {
          addListener: jest.fn(),
          removeListener: jest.fn(),
        };
      };
  });

  it("is rendering FirstStep component", () => {
    const appointment = {
      firstName: "",
      lastName: "",
      email: "",
      dateTime: null,
    };
    render(
      <Form
        layout="vertical"
        onFinish={() => {}}
        initialValues={appointment}
        style={{ marginTop: "24px" }}
      >
        <FirstStep
          appointment={appointment}
          setAppointment={() => {}}
          handleNextStep={() => {}}
        />
      </Form>
    );

    expect(screen.getByTestId("firstName")).toBeInTheDocument();
    expect(screen.getByTestId("firstName")).toHaveValue("");

    fireEvent.change(screen.getByTestId("firstName"), {
      target: { value: "Ilia" },
    });

    expect(screen.getByTestId("firstName")).toHaveValue("Ilia");

    expect(screen.getByTestId("lastName")).toBeInTheDocument();
    expect(screen.getByTestId("lastName")).toHaveValue("");

    fireEvent.change(screen.getByTestId("lastName"), {
      target: { value: "Sturua" },
    });

    expect(screen.getByTestId("lastName")).toHaveValue("Sturua");

    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toHaveValue("");

    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "iliasturua@example.com" },
    });

    expect(screen.getByTestId("email")).toHaveValue("iliasturua@example.com");

    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: "Next" }));
  });
});
