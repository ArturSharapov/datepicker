import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { useSignal, useComputed } from "@preact/signals";
import { useRef } from "preact/hooks";
import { getWeekdayList, generateListOfDaysForMonthAndYear, getMonthAndYearFromDate, formatToReadableDate, getDatesInRange, sortByDate, } from "./utils";
/**
 * @param {import("./calendar").CalendarProps} props
 * @returns
 */
export function Calendar({ value = new Date(), mode = "single", onSelect = () => { }, locale = "en-gb", weekdayFormat = "narrow", arrowLeft: ArrowLeft = () => _jsx(_Fragment, { children: "<" }), arrowRight: ArrowRight = () => _jsx(_Fragment, { children: ">" }), }) {
    const selecting = useRef(false);
    const refRange$ = useSignal([]);
    const activeDate$ = useSignal(new Date(value));
    const rangeHovering$ = useSignal(null);
    const weekdays = getWeekdayList(locale, {
        format: weekdayFormat,
    });
    const possibleDates = useComputed(() => {
        const activeDate = activeDate$.value;
        return generateListOfDaysForMonthAndYear(activeDate.getMonth(), activeDate.getFullYear(), {
            weekdays: weekdays,
        });
    });
    const justDates = useComputed(() => possibleDates.value.map((d) => d.map((x) => x.date)).flat(2));
    const datesInSelectionRange = (() => {
        if (mode == "range" &&
            Array.isArray(value) &&
            value?.length == 2 &&
            !selecting.current)
            return getDatesInRange(justDates.value, value[0], value[1]);
        return [];
    })();
    const datesInHoverRange$ = useComputed(() => {
        const allDates = justDates.value;
        if (rangeHovering$.value &&
            refRange$.value.length == 1 &&
            mode == "range") {
            const sorted = [refRange$.value[0], rangeHovering$.value].sort(sortByDate);
            return getDatesInRange(allDates, sorted[0], sorted[1]);
        }
        return [];
    });
    let tabIndexOffset = 3;
    return (_jsxs("div", { class: "preachjs-calendar", children: [_jsxs("div", { class: "preachjs-calendar--header", children: [_jsx("button", { tabIndex: 1, "aria-label": "Previous", onClick: () => {
                            const curr = new Date(activeDate$.value);
                            curr.setMonth(curr.getMonth() - 1);
                            activeDate$.value = curr;
                        }, children: _jsx(ArrowLeft, {}) }), _jsx("h2", { "aria-hidden": "true", children: getMonthAndYearFromDate(activeDate$.value) }), _jsx("button", { tabIndex: 2, "aria-label": "Next", onClick: () => {
                            const curr = new Date(activeDate$.value);
                            curr.setMonth(curr.getMonth() + 1);
                            activeDate$.value = curr;
                        }, children: _jsx(ArrowRight, {}) })] }), _jsxs("table", { class: "preachjs-calendar--grid", role: "grid", autofocus: true, tabIndex: 3, "aria-label": getMonthAndYearFromDate(activeDate$.value), children: [_jsx("thead", { class: "preachjs-calendar--grid-header", children: _jsx("tr", { children: weekdays.map((d) => {
                                return _jsx("th", { children: d });
                            }) }) }), _jsx("tbody", { class: "preachjs-calendar--grid-body", children: possibleDates.value.map((dateRow, rowIndex) => {
                            return (_jsx("tr", { children: dateRow.map((dateItem, colIndex) => {
                                    const isDateActive = (mode == "single" &&
                                        !Array.isArray(value) &&
                                        dateItem.date.getTime() === value.getTime()) ||
                                        false;
                                    let isRangeStart;
                                    let isRangeEnd;
                                    let isInRange = datesInSelectionRange.includes(dateItem.date) ||
                                        datesInHoverRange$.value.includes(dateItem.date);
                                    if (mode == "range") {
                                        if (refRange$.value.length && selecting.current) {
                                            isRangeStart =
                                                dateItem.date.getTime() ===
                                                    refRange$.value[0].getTime();
                                        }
                                        else if (Array.isArray(value) && !selecting.current) {
                                            isRangeStart =
                                                value[0] &&
                                                    dateItem.date.getTime() === value[0].getTime();
                                            isRangeEnd =
                                                value[1] &&
                                                    dateItem.date.getTime() === value[1].getTime();
                                        }
                                    }
                                    const gridCellStyles = [
                                        "preachjs-calendar--grid-cell",
                                        isDateActive && "active",
                                        isRangeStart && "preachjs-calendar--grid-cell-start",
                                        isInRange && "preachjs-calendar--grid-cell-in-range",
                                        isRangeEnd && "preachjs-calendar--grid-cell-end",
                                    ];
                                    if (dateItem.previousMonth || dateItem.nextMonth) {
                                        return (_jsx("td", { role: "gridcell", "data-row": rowIndex, "data-col": colIndex, "aria-disabled": "true", class: mergeStyle(gridCellStyles, "preachjs-calendar--grid-cell-disabled"), tabIndex: colIndex + tabIndexOffset + 7 * rowIndex, ref: createKeypressHandler(mode), children: _jsx("button", { style: { flex: 1 }, disabled: true, children: dateItem.date.getDate() }) }));
                                    }
                                    return (_jsx("td", { ref: createKeypressHandler(mode), tabIndex: colIndex + tabIndexOffset + 7 * rowIndex, "data-row": rowIndex, "data-col": colIndex, "data-date": dateItem.date.toISOString(), role: "gridcell", class: mergeStyle(gridCellStyles, ""), children: _jsx("button", { onClick: () => {
                                                selecting.current = true;
                                                if (mode == "single") {
                                                    onSelect(dateItem.date);
                                                    selecting.current = false;
                                                    return;
                                                }
                                                if (mode == "range") {
                                                    refRange$.value.push(dateItem.date);
                                                    if (refRange$.value.length == 2) {
                                                        const selection = refRange$.value.slice();
                                                        refRange$.value = [];
                                                        onSelect(selection.sort((x, y) => x.getTime() > y.getTime()));
                                                        selecting.current = false;
                                                    }
                                                    else {
                                                        rangeHovering$.value = null;
                                                        tieHoveredElmToSignal(window, rangeHovering$);
                                                    }
                                                }
                                            }, "aria-label": formatToReadableDate(dateItem.date, undefined), children: dateItem.date.getDate() }) }));
                                }) }));
                        }) })] })] }));
}
function createKeypressHandler(mode) {
    return (node) => {
        if (!node)
            return;
        if (mode !== "single")
            return;
        node.addEventListener("keyup", (e) => {
            const isParentCell = Array.from(e.target.parentNode.classList.entries()).findIndex((d) => d[1] == "preachjs-calendar--grid-cell") > -1;
            const isCell = Array.from(e.target.classList.entries()).findIndex((d) => d[1] == "preachjs-calendar--grid-cell") > -1;
            if (!(isCell || isParentCell))
                return;
            const CellTarget = isParentCell ? e.target.parentNode : e.target;
            const currentRow = +CellTarget.dataset.row;
            const currentCol = +CellTarget.dataset.col;
            console.log({ k: e.key });
            switch (e.key) {
                case "ArrowDown": {
                    const elem = e.target
                        .closest(".preachjs-calendar--grid-body")
                        .querySelector(`[data-row='${currentRow + 1}'][data-col='${currentCol}']`);
                    elem?.querySelector("button").focus();
                    break;
                }
                case "ArrowUp": {
                    const elem = e.target
                        .closest(".preachjs-calendar--grid-body")
                        .querySelector(`[data-row='${currentRow - 1}'][data-col='${currentCol}']`);
                    elem?.querySelector("button").focus();
                    break;
                }
                case "ArrowRight": {
                    let changedCol = currentCol + 1;
                    let changedRow = currentRow;
                    if (changedCol > 6) {
                        changedRow += 1;
                        changedCol = 0;
                    }
                    const elem = e.target
                        .closest(".preachjs-calendar--grid-body")
                        .querySelector(`[data-row='${changedRow}'][data-col='${changedCol}']`);
                    elem?.querySelector("button").focus();
                    break;
                }
                case "ArrowLeft": {
                    let changedCol = currentCol - 1;
                    let changedRow = currentRow;
                    if (changedCol < 0) {
                        changedRow -= 1;
                        changedCol = 6;
                    }
                    const elem = e.target
                        .closest(".preachjs-calendar--grid-body")
                        .querySelector(`[data-row='${changedRow}'][data-col='${changedCol}']`);
                    elem?.querySelector("button").focus();
                    break;
                }
                case " ":
                case "Enter": {
                    const elem = e.target.closest(`[data-row][data-col]`);
                    elem?.querySelector("button").click();
                    break;
                }
            }
        });
    };
}
function tieHoveredElmToSignal(window, sign$) {
    window.addEventListener("mousemove", (e) => {
        const elm = document.elementFromPoint(e.clientX, e.clientY);
        const nearbyCell = elm.closest(".preachjs-calendar--grid-cell");
        if (!nearbyCell)
            return;
        sign$.value = new Date(nearbyCell.dataset.date);
    }, {
        passive: true,
    });
}
function mergeStyle(arr, ...additional) {
    return additional.filter(Boolean).concat(arr.filter(Boolean)).join(" ");
}
