import { Input, Modal } from 'antd';
import { InputModelProps } from '../types/kanbanBoardTypes';
import { Select, Space } from 'antd';



const InputModal = ({
    title,
    value,
    setterMethod,
    placeholder,
    buttonMessage,
    showModal,
    setShowModal,
    type,
    label,
    setLabel
}: InputModelProps) => {


    const handleOk = () => {
        setShowModal(false);
    };

    const handleCancel = () => {
        setterMethod("")
        setShowModal(false);
    };

    const handleChange = (value: string) => {
        setLabel(value)
    };

    return (
        <>
            {/* <Button type="primary" onClick={showModal}>
                Open Modal
            </Button> */}
            <Modal title={title}
                open={showModal}
                onOk={handleOk}
                okText={buttonMessage}
                onCancel={handleCancel}

            >

                <Input
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setterMethod(e.target.value)}
                />

                {
                    (type) && (
                        <Space
                            style={{
                                marginTop: 20
                            }}
                        >
                            <p>
                                Label:
                            </p>
                            <Select
                                defaultValue="Easy"
                                style={{ width: 120 }}
                                onChange={handleChange}
                                options={[
                                    { value: 'Easy', label: 'Easy', },
                                    { value: 'Medium', label: 'Medium' },
                                    { value: 'Hard', label: 'Hard' },
                                ]}
                            />
                        </Space>
                    )
                }

            </Modal>
        </>
    );
};

export default InputModal;