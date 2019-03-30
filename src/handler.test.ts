import { handler, IotButtonClickType, IotButtonClickEvent } from "./handler";
import { Context } from "aws-lambda";

const generateHandlerArgs = (clickType: IotButtonClickType = "SINGLE") =>
  [
    {
      serialNumber: "xxx",
      batteryVoltage: "xxmV",
      clickType,
    },
    ({} as any) as Context,
    null,
  ] as [IotButtonClickEvent, Context, null];

describe("handler()", () => {
  let initialEnv: NodeJS.ProcessEnv;
  beforeEach(() => {
    initialEnv = process.env;
    process.env = { ...initialEnv };
  });

  afterEach(() => {
    process.env = initialEnv;
  });

  it("throws by default because env vars are not provided", async () => {
    expect(handler(...generateHandlerArgs())).rejects.toThrow();
  });

  it("works for valid env variables", async () => {
    process.env.GIT_REPO_URI = "stub";
    await handler(...generateHandlerArgs());
    expect(1).toEqual(1);
  });
});
