import { forwardRef } from "react";
import { useState } from "react";
import "./input-field.scss";

interface _props {
  defaultValue?: string;
  type: string;
  label: string;
  onChange: (value: string) => void;
}

export const InputField = forwardRef<HTMLInputElement, _props>(
  ({ defaultValue, type, label, onChange }, ref) => {
    const [passwordShown, setPasswordShown] = useState(false);

    return (
      <div className="input-field">
        <label className="label" htmlFor={label}>
          {label}
        </label>
        {type === "password" ? (
          <>
            <input
              defaultValue={defaultValue}
              className="input"
              type={passwordShown ? "text" : "password"}
              title={label}
              name={label}
              ref={ref}
              onChange={(event: any) => {
                onChange(event);
              }}
            />
            <div className="checkbox">
              <label className="label">show password</label>
              <input
                type="checkbox"
                onChange={(value) => {
                  setPasswordShown(() => value.target.checked);
                }}
              />
            </div>
          </>
        ) : (
          <input
            defaultValue={defaultValue}
            className="input"
            ref={ref}
            type={type}
            title={label}
            name={label}
            autoComplete="on"
            onChange={(event: any) => onChange(event)}
          />
        )}
      </div>
    );
  }
);

export default InputField;
