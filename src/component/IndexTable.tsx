import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import { LazyLoadImage } from 'react-lazy-load-image-component';


export default function IndexTable({ data, loading,callback }: any) {
    // true, false
    const [checked, setChecked] = React.useState<any[]>([]);


    React.useEffect(() => {
        let d = {...data}

        delete d.variants
        let storev:any[] =[]
        checked.map((i:boolean,j:number)=>{
            if(i){
                storev.push(data.variants[j])
            }
        })
        d.variants = storev
        if(checked.includes(true)){
            callback(d)
        }else{
            callback(data.id)
        }
        
    },[checked])

    const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        let d = [...checked].map((i: any) => event.target.checked)
        setChecked(() => [...d]);
        callback(data)
        // console.log('ddd ', d)
        // [event.target.checked, event.target.checked]
    };

    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>, j: number) => {
        let dt = [...checked]
        // let d = checked[j]
        dt.splice(j, 1, event.target.checked)
        // console.log('dt', dt)

        setChecked(dt);
        // callback(data)
    };

    

    React.useEffect(() => {
        let f = data.variants.map((i: any) => false).slice(0, data.variants.length)
        // console.log('checked', checked, f)

        setChecked(f)
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column',marginTop:'10px' }}>
            
            {checked.length > 0 && <FormControlLabel
                label={
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LazyLoadImage 
                            src={data.image.src} 
                            width={36} 
                            height={36} 
                            className='img' 
                            alt='image' 
                            effect='blur'
                            placeholderSrc='../assets/blur.png'
                        />
                        <h2 className='title'>{data.title}</h2>
                    </div>}
                control={
                    <Checkbox
                        checked={checked.includes(true)}
                        // indeterminate={checked[0] }
                        onChange={handleChange1}
                        style={checked.includes(true)?{color:  '#008060'}:{}}
                    />
                }
            />}
            
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                {checked.length > 0 && data.variants.map((i: any, j: number) => {
                    return <>
                        <Divider orientation="horizontal" style={{width: '110%',marginLeft: '-40px'}} />
                        <FormControlLabel
                            key={j}
                            label={<h3 className='child'>{i.title}</h3>}
                            control={<Checkbox  style={checked.includes(true)?{color:'#008060'}:{}} checked={checked[j]} onChange={(e: any) => handleChange2(e, j)} />}
                        />
                    </>

                })}
            </Box>
            <Divider orientation="horizontal" style={{width: '105%',marginLeft: '-15px'}}/>
            
        </div>
    );
}
