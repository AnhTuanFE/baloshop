import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { AutoComplete, Input } from 'antd';
import './Test.css';

const renderItem = (title, count) => ({
    value: title,
    label: (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            {title}
            <span>
                <UserOutlined /> {count}
            </span>
        </div>
    ),
});
const options = [
    {
        label: 'Libraries',
        options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)],
    },
];
const Test = () => (
    <div className="flex min-h-[40vh] justify-center">
        <div className="m-auto">
            <AutoComplete
                popupClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={500}
                style={{
                    width: 250,
                }}
                options={options}
            >
                <Input.Search size="large" placeholder="input here" />
            </AutoComplete>
        </div>
    </div>
);
export default Test;
