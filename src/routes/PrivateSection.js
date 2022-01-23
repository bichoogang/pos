import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { Column, Row } from 'simple-flexbox';
import { SidebarComponent, SidebarContext } from 'components/sidebar';
import HeaderComponent from 'components/header/HeaderComponent';
import PrivateRoutes from './PrivateRoutes';

const useStyles = createUseStyles({
    container: {
        height: '100%',
        minHeight: 850
    },
    mainBlock: {
        marginLeft: 255,
        padding: 30,
        '@media (max-width: 2080px)': {
            marginLeft: 0
        }
    },
    contentBlock: {
        marginTop: 54
    }
});

function PrivateSection({loguser}) {
    const theme = useTheme();
    const classes = useStyles({ theme });

    return (
        <SidebarContext>
            <Row className={classes.container}>
                <SidebarComponent loguser={loguser} />
                <Column flexGrow={1} className={classes.mainBlock}>
                    <HeaderComponent loguser={loguser}/>
                    <div className={classes.contentBlock}>
                        <PrivateRoutes loguser={loguser}/>
                    </div>
                </Column>
            </Row>
        </SidebarContext>
    );
}

export default PrivateSection;
