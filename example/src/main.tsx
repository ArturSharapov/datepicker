import { signal } from "@preact/signals";
import { Calendar, CalendarMode, CalendarValue } from "../../src";
import { render } from "preact";
import "./main.css";

const mode = signal<CalendarMode>("single");
const selectedDate = signal<CalendarValue | undefined>(undefined);

const isMode = <M extends CalendarMode>(
  mode: CalendarMode,
  _value: CalendarValue | undefined,
  expected: M
): _value is CalendarValue<M> => mode == expected;

const App = () => {
  return (
    <>
      <div class="cal-container">
        <div class="cal-mode-selection">
          <label>
            <input
              name="mode"
              value="single"
              checked={mode.value == "single"}
              type="radio"
              onChange={e => e.currentTarget.checked && (mode.value = "single")}
            />
            Single
          </label>
          <label>
            <input
              name="mode"
              value="range"
              checked={mode.value == "range"}
              type="radio"
              onChange={e => e.currentTarget.checked && (mode.value = "range")}
            />
            Range
          </label>
        </div>
        <Calendar
          mode={mode.value}
          value={selectedDate.value}
          onSelect={value => {
            if (Array.isArray(value) && value[1] < value[0]) value = [value[1], value[0]];
            selectedDate.value = value;
          }}
          weekdayFormat="narrow"
          arrowRight={() => {
            return (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 6l6 6l-6 6" />
              </svg>
            )
          }}
          arrowLeft={() => {
            return (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 6l-6 6l6 6" />
              </svg>
            )
          }}
        />
        <div>
          {isMode(mode.value, selectedDate.value, "single") && (
            <p class="selected-text">
              <strong class="header">Selected: </strong>
              {selectedDate.value ? selectedDate.value.toLocaleString() : "None"}
            </p>
          )}
        </div>
        <div>
          {isMode(mode.value, selectedDate.value, "range") ? (
            <p class="selected-text">
              <strong class="header">Selected Range: </strong>
              {selectedDate?.value?.length == 2 ? selectedDate.value[0].toLocaleString() : "None"} -{" "}
              {selectedDate?.value?.length == 2 ? selectedDate.value[1].toLocaleString() : "None"}
            </p>
          ) : null}
        </div>
      </div>
    </>
  )
};

render(<App />, document.querySelector("#app")!);
