<div className='nav-bar'>
            <div>
                <Button
                    id="dashboard-button" className='button active'
                    aria-controls={open ? 'dashboard-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onMouseEnter={handleClick}
                    
                >
                    <TiHome size={28} />
                </Button>
            </div>
            <div>
                <Button
                    id="fade-button" className='button'
                    aria-controls={open ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    // onClick={handleClick}
                >
                    Home
                </Button>
            </div>
            <div>
                <Button
                    id="dashboard-button" className='button'
                    aria-controls={open ? 'dashboard-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onMouseEnter={handleClick}
                    
                >
                    OLUWO OF IWO LAND
                </Button>
                {/* <Menu
                    id="dashboard-menu"
                    slotProps={{
                    list: {
                        'aria-labelledby': 'dashboard-button',
                    },
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                >
                    <MenuItem onMouseLeave={handleClose}>News</MenuItem>
                    <MenuItem onMouseLeave={handleClose}>My account</MenuItem>
                    <MenuItem onMouseLeave={handleClose}>Logout</MenuItem>
                </Menu> */}
            </div>
            <div>
                <Button
                    id="fade-button" className='button'
                    aria-controls={open ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    Iwo Land
                </Button>
                {/* <Menu
                    id="fade-menu"
                    slotProps={{
                    list: {
                        'aria-labelledby': 'fade-button',
                    },
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={handleClose}>Nws</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu> */}
            </div>
            <div>
                <Button
                    id="fade-button" className='button'
                    aria-controls={open ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    Blogs
                </Button>
                {/* <Menu
                    id="fade-menu"
                    slotProps={{
                    list: {
                        'aria-labelledby': 'fade-button',
                    },
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={handleClose}>Nws</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu> */}
            </div>
            <div>
                <Button
                    id="fade-button" className='button'
                    aria-controls={open ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    Gallery
                </Button>
                {/* <Menu
                    id="fade-menu"
                    slotProps={{
                    list: {
                        'aria-labelledby': 'fade-button',
                    },
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={handleClose}>Nws</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu> */}
            </div>
            <div style={{flex: "1"}}>
                <Button
                    id="dashboard-button" className='button'
                    aria-controls={open ? 'dashboard-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onMouseEnter={handleClick}
                    
                >
                    RESOURCES AND HELP
                </Button>
            </div>
            <div className='search-button'>
                <FaSearch size={18} />
                
            </div>
        </div>