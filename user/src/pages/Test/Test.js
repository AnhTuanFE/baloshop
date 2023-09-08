import React, { useState } from 'react';
import { Button, Drawer, theme } from 'antd';
import { faMagnifyingGlass, faBars, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Typography, Avatar, TextField, MenuItem, Autocomplete } from '@mui/material';

const App = () => {
    const { token } = theme.useToken();
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    return (
        <div className="min-h-[100vh] bg-red-400">
            <div className="relative h-[50px] overflow-hidden bg-slate-400">
                <div>
                    <FontAwesomeIcon
                        className="cursor-pointer px-4 py-2 text-2xl"
                        onClick={showDrawer}
                        icon={faChevronRight}
                    />
                </div>
                <Drawer
                    className="[&_.ant-drawer-body]:py-2"
                    placement="left"
                    closable={false}
                    onClose={onClose}
                    open={open}
                    getContainer={false}
                    width={100}
                >
                    <div className="flex justify-between">
                        <form className="">
                            <div className="flex justify-center">
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    size="small"
                                    className="w-[200px]  max-use400:w-[150px] sm:w-[200px] md:w-[300px] lg:w-[400px]"
                                    renderInput={(params) => (
                                        <TextField className="bg-[var(--white-color)]" {...params} label="Tìm kiếm" />
                                    )}
                                />
                                <button
                                    type="submit"
                                    style={{
                                        borderRadius: '0px 4px 4px 0px',
                                    }}
                                    className="bg-[var(--main-color)] px-3.5 text-white hover:bg-[var(--main-color-hover)]"
                                >
                                    <FontAwesomeIcon className="text-xl" icon={faMagnifyingGlass} />
                                </button>
                            </div>
                        </form>
                        <div className="absolute right-0 pt-2.5">
                            <FontAwesomeIcon
                                className="cursor-pointer text-2xl"
                                onClick={onClose}
                                icon={faChevronLeft}
                            />
                        </div>
                    </div>
                </Drawer>
            </div>
        </div>
    );
};
export default App;
