// Action Interface
export interface ActionProps<PayloadProps> {
    type: string;
    payload?: PayloadProps;
}