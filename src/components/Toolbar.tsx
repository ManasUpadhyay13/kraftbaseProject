import { PlusCircleOutlined, SearchOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { Input, Select, Space } from 'antd';
import { Button } from 'antd';
import '../styles/toolbar.css'
import { updateLabel, updateSearch, updateSort } from '../utils/redux';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';


const Toolbar = () => {

    const sort = useSelector((state: RootState) => state.kraftbase.sort);

    const handleSearchChange = (e: any) => {
        updateSearch(e.target.value)
    }

    const handleChange = (value: string) => {
        updateLabel(value);
    }

    return (
        <div className='toolbar'>
            <Input
                placeholder="Search by issue name..."
                prefix={<SearchOutlined />}
                className='search'
                onChange={(e) => handleSearchChange(e)}
            />

            {
                (sort === false) && (
                    <Button
                        icon={<SortAscendingOutlined />}
                        onClick={() => updateSort(!sort)}
                    >
                        Sort By
                    </Button>
                )
            }

            {
                (sort === true) && (
                    <Button
                        icon={<SortAscendingOutlined />}
                        onClick={() => updateSort(!sort)}
                        type='primary'
                    >
                        Sort By
                    </Button>
                )
            }

            <Space>
                <Select
                    defaultValue="All"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={[
                        { value: 'All', label: 'All', },
                        { value: 'Easy', label: 'Easy', },
                        { value: 'Medium', label: 'Medium' },
                        { value: 'Hard', label: 'Hard' },
                    ]}
                />
            </Space>

            <Button type='dashed' icon={<PlusCircleOutlined />} >Assigned To</Button>

            <Button type='dashed' icon={<PlusCircleOutlined />} >Severity</Button>

            <Button type='dashed' icon={<PlusCircleOutlined />} >Status</Button>

            <Button type='dashed' icon={<PlusCircleOutlined />} >Pentest</Button>

            <Button type='dashed' icon={<PlusCircleOutlined />} >Target</Button>

        </div>
    )
}

export default Toolbar
