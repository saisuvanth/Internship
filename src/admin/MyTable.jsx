import React, { useState, useRef } from 'react';
import { Table, Input, Form, Space, Button, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import axios from 'axios';

const EditableCell = ({
	editing,
	dataIndex,
	title,
	inputType,
	record,
	index,
	children,
	...restProps
}) => {
	const inputNode = <Input />;
	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item
					name={dataIndex}
					style={{
						margin: 0,
					}}
					rules={[
						{
							required: true,
							message: `Please Input ${title}!`,
						},
					]}
				>
					{inputNode}
				</Form.Item>
			) : (
				children
			)}
		</td>
	);
};

const EditableTable = ({ mans, setMans, seterr }) => {
	const [form] = Form.useForm();
	const [editingKey, setEditingKey] = useState('');
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const searchInput = useRef();

	const getColumnSearchProps = dataIndex => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{ marginBottom: 8, display: 'block' }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
						Reset
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							confirm({ closeDropdown: false });
							setSearchText(selectedKeys[0]);
							setSearchedColumn(dataIndex);
						}}
					>
						Filter
					</Button>
				</Space>
			</div>
		),
		filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
		onFilter: (value, record) =>
			record[dataIndex]
				? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
				: '',
		onFilterDropdownVisibleChange: visible => {
			if (visible) {
				setTimeout(() => searchInput.select(), 100);
			}
		},
		render: text =>
			searchedColumn === dataIndex ? (
				<span style={{ backgroundColor: 'yellow' }}>{searchText}</span>
			) : (
				text
			),
	});

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	}

	const handleReset = clearFilters => {
		clearFilters();
		setSearchText('');
	};

	const handleDelete = key => {
		const headers = { 'x-auth': window.localStorage.getItem('TOKEN'), 'content-type': 'application/x-www-form-urlencoded' };
		axios.post('https://assignment-069.herokuapp.com/delete/', new URLSearchParams({ id: key }), { headers }
		).then(res => {
			if (res.status === 200)
				setMans(man => man.filter(m => m.key !== key))
		}).catch(err => {
			seterr(`Error ${err} occurred`);
		})
	}

	const isEditing = (record) => record.key === editingKey;

	const edit = (record) => {
		form.setFieldsValue({
			username: '',
			email: '',
			phone: '',
			...record,
		});
		setEditingKey(record.key);
	};

	const cancel = () => {
		setEditingKey('');
	};

	const save = async (key) => {
		try {
			const row = await form.validateFields();
			const newData = [...mans];
			const index = newData.findIndex((item) => key === item.key);
			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, { ...item, ...row });
				const headers = { 'x-auth': window.localStorage.getItem('TOKEN'), 'content-type': 'application/x-www-form-urlencoded' };
				const data = {};
				for (let i in row) {
					if (item[i] !== row[i]) {
						data[i] = i === 'age' ? parseInt(row[i]) : row[i];
					}
				}
				data['id'] = item['key'];
				axios.post('https://assignment-069.herokuapp.com/update/', new URLSearchParams({ ...data }), { headers }
				).then(res => {
					setMans(newData);
					setEditingKey('');
				}).catch(err => {
					seterr('cant connect to database');
				})
			} else {
				newData.push(row);
				setMans(newData);
				setEditingKey('');
			}
		} catch (errInfo) {
			console.log('Validate Failed:', errInfo);
		}
	};

	const columns = [
		{
			title: 'User Name',
			dataIndex: 'username',
			width: '25%',
			editable: true,
			...getColumnSearchProps('username')
		},
		{
			title: 'Email',
			dataIndex: 'email',
			width: '30%',
			editable: true,
			...getColumnSearchProps('email')
		},
		{
			title: 'Age',
			dataIndex: 'age',
			width: '8%',
			editable: true,
			sorter: (a, b) => a.age - b.age,
			...getColumnSearchProps('age')
		},
		{
			title: 'Gender',
			dataIndex: 'gender',
			width: '8%',
			editable: true,
			filter: [
				{
					text: 'Male',
					value: 'm',
				},
				{
					text: 'Female',
					value: 'f',
				},
			],
			onFilter: (value, record) => record.address.indexOf(value) === 0,
		},
		{
			title: 'Phone',
			dataIndex: 'phone',
			width: '30%',
			editable: true,
			sorter: (a, b) => a.phone - b.phone,
		},
		{
			title: 'Edit',
			dataIndex: 'operation',
			render: (_, record) => {
				const editable = isEditing(record);
				return editable ? (
					<span>
						<Typography.Link
							onClick={() => save(record.key)}
							style={{
								marginRight: 8,
							}}>Save
						</Typography.Link>
						<Typography.Link onClick={cancel}>Cancel</Typography.Link>
					</span>
				) : (
					<Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
						Edit
					</Typography.Link>
				);
			},
		},
		{
			title: 'Delete',
			dataIndex: 'operation',
			render: (_, record) =>
				mans.length >= 1 ? (
					<Typography.Link onClick={() => handleDelete(record.key)}>
						Delete
					</Typography.Link>
				) : null,
		},
	];
	const mergedColumns = columns.map((col) => {
		if (!col.editable) {
			return col;
		}

		return {
			...col,
			onCell: (record) => ({
				record,
				inputType: 'text',
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
			}),
		};
	});
	return (
		<Form form={form} component={false}>
			<Table
				components={{
					body: {
						cell: EditableCell,
					},
				}}
				bordered
				dataSource={mans}
				columns={mergedColumns}
				rowClassName="editable-row"
				pagination={{
					onChange: cancel,
				}}
			/>
		</Form>
	);
};

export default EditableTable;