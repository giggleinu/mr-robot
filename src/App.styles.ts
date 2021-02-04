import { SerializedStyles, css } from "@emotion/react";

const styles = (): SerializedStyles => css`
    .page {
        padding: 24px;

        .chakra-input {
            margin: 16px 0;
        }

        .chakra-button__group {
            margin-bottom: 20px;

            button {
                width: 120px;
            }
        }

        .command-list {
            margin-bottom: 20px;
        }
    }
`;

export default styles;