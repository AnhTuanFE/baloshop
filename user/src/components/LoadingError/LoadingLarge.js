import { Space, Spin } from 'antd';

const LoadingLarge = ({ content }) => (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-[1000] flex items-center justify-center bg-slate-300 opacity-[0.9]">
        <Space className="flex w-full justify-center py-4">
            <Space className="relative z-[1500]">
                <Spin className="text-base font-semibold text-white" tip={content} size="large">
                    <div className="h-full w-full px-40" />
                </Spin>
            </Space>
        </Space>
    </div>
);
export default LoadingLarge;
