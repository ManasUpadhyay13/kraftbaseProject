import { PlusCircleOutlined, SearchOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Button } from 'antd';
import '../styles/toolbar.css'

const Toolbar = () => {
    return (
        <div className='toolbar'>
            <Input placeholder="Search by issue name..." prefix={<SearchOutlined />} className='search' />
            <Button icon={<SortAscendingOutlined />} >Sort By</Button>
            <Button type='dashed' icon={<PlusCircleOutlined />} >Assigned To</Button>
            <Button type='dashed' icon={<PlusCircleOutlined />} >Severity</Button>
            <Button type='dashed' icon={<PlusCircleOutlined />} >Status</Button>
            <Button type='dashed' icon={<PlusCircleOutlined />} >Pentest</Button>
            <Button type='dashed' icon={<PlusCircleOutlined />} >Target</Button>
        </div>
    )
}

export default Toolbar
