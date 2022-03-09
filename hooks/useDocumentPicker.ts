// packages Imports
import { useEffect, useState } from "react";
import * as DocumentPicker from "expo-document-picker";

// types imports
import { SelectedFileProps } from "../types/HooksTypes";
import Helper from "../utils/Helper";
import { Image } from "react-native";

// custom hook to pick documents from the user's device
export default function useDocumentPicker({ defaultFile = null }: { defaultFile?: SelectedFileProps }) {
    const [selectedFile, setSelectedFile] = useState<SelectedFileProps>(defaultFile);
    const [sameAsInitial, SetSameAsInitial] = useState(true);

    // keep track that files has changed
    useEffect(() => {
        if (defaultFile === null && selectedFile === null) SetSameAsInitial(true);
        else {
            if (selectedFile?.uri === defaultFile?.uri) SetSameAsInitial(true);
            else SetSameAsInitial(false);
        }
    }, [selectedFile]);

    // Remove selected file
    const unselectFile = () => {
        try {
            if (selectedFile !== null) setSelectedFile(defaultFile);
        } catch (error) { }
    };

    // function to pick document
    const PickDocument = async (type?: any) => {
        if (typeof type !== "string") type = "*/*";

        try {
            const picked: any = await DocumentPicker.getDocumentAsync({
                type: type ? type : "*/*",
            });

            if (picked.type !== "cancel") {

                // if size is greater than 5MB then reject
                if (picked.size > 5000000) {
                    Helper.ShowToast("File should be less than 5MB");
                    return;
                }

                let widthPic = 0;
                let heightPic = 0;

                await Image.getSize(picked.uri, (width, height) => {
                    widthPic = width;
                    heightPic = height;
                });

                setSelectedFile({
                    ...picked, isRemoteImage: false,
                    width: widthPic, height: heightPic

                });
                return;
            }

            setSelectedFile(defaultFile);
        } catch (error) {
            setSelectedFile(defaultFile);
        }
    };

    return { selectedFile, PickDocument, unselectFile, setSelectedFile, sameAsInitial };
}