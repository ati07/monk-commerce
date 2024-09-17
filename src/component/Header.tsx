import React from 'react'
function Header() {
  return (
    <div style={{display:'flex',width:'100%',height:'40px',justifyContent:'flex-start',alignItems: 'center',paddingLeft: '20px',borderBottom: '1px solid #D1D1D1',
        marginBottom: '30px'}}>
        <img src='/monk.svg'/>
        <div style={{marginLeft: '10px',fontSize: '15px',fontWeight: 500}}>Monk Upsell & Cross-sell</div>
    </div>
  )
}

export default Header