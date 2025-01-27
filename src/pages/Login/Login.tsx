import { Button, Card, Form, Input } from "antd"
import { useDispatch } from "react-redux";
import { loginRequest } from "../../redux/reducers/authReducer";
import "./Login.scss";

export const Login = () => {
    const dispatch = useDispatch();

    const authHandleClick = (values: { email: string, password: string }) => {
        dispatch(loginRequest(values))
    }

    return (
        <div className="login-wrapper">
            <Card title="Вход в систему" style={{ width: 300 }}>
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={authHandleClick}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Введите логин!' }]}
                    >
                        <Input placeholder="Логин" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Введите пароль!' }]}
                    >
                        <Input.Password placeholder="Пароль" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )

}