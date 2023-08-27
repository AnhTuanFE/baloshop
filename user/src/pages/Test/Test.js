import { Button, ConfigProvider } from 'antd';
const Test = () => (
    <div className="flex min-h-[40vh] justify-center bg-gray-600">
        <div className="m-auto">
            <ConfigProvider
                theme={{
                    token: {},
                    components: {},
                }}
            >
                <Button type="primary">hello</Button>
            </ConfigProvider>
        </div>
    </div>
);
export default Test;
