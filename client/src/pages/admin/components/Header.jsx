import React from 'react'
import Logo from '../../../images/logo prime.png'
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom'

export default function Header({ logout }) {

    return (
        <div className="header" >
            <div className="header-container container flex ai-center jc-spaceb">
                <div className="header-container-logo">
                    <Link to="/admin" >
                        <img src={Logo} className="img-res" alt="" />
                    </Link>
                </div>
                <div className="header-container-buttons flex ai-center">
                    <Tooltip title="Profili" >
                        <Link to="/admin/profili" className="header-container-buttons-btn" >
                            <PermIdentityOutlinedIcon style={{ color: '#ffd5b4', fontSize: '35px' }} />
                        </Link>
                    </Tooltip>
                    <Tooltip title="Dil">
                        <button className="header-container-buttons-btn" onClick={logout} >
                            <ExitToAppOutlinedIcon style={{ color: '#a1a1a1', fontSize: '35px' }} />
                        </button>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}
