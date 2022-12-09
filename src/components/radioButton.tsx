import {FC} from "react";

interface RadioProps {
    changed: any,
    id: string,
    isSelected: boolean,
    label: string,
    value: string
}

export const RadioButton: FC<RadioProps> =
    ({changed, id, isSelected, label, value}) => {
        return (<div className="radio-button">
                <input
                    id={id}
                    onChange={changed}
                    value={value}
                    type="radio"
                    checked={isSelected}
                />
                <label htmlFor={id}>{label}</label>
            </div>
        );


    }
