'use client'

import { Modal, Descriptions, Avatar } from 'antd'
import dayjs from 'dayjs'
import { UserInformation } from '..'

interface ViewPatientProps {
  open: boolean
  setOpen: (open: boolean) => void
  patientDetail: UserInformation | undefined
}

export const ViewPatient: React.FC<ViewPatientProps> = ({ open, setOpen, patientDetail }) => {
  if (!patientDetail) return null

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      title="Chi tiết bệnh nhân"
      footer={null}
      width={700}
    >
      <div className="flex flex-col items-center mb-6">
        <Avatar size={128} src={patientDetail.avatarUrl} className="mb-4" />
        <h2 className="text-2xl font-bold text-secondarySupperDarker">{patientDetail.fullName}</h2>
      </div>
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Tên đăng nhập" span={2}>{patientDetail.username}</Descriptions.Item>
        <Descriptions.Item label="Số điện thoại" span={2}>{patientDetail.phoneNumber || 'Không có'}</Descriptions.Item>
        <Descriptions.Item label="Ngày sinh" span={2}>{dayjs(patientDetail.dob).format('DD-MM-YYYY')}</Descriptions.Item>
        <Descriptions.Item label="Giới tính" span={2}>{patientDetail.gender.name}</Descriptions.Item>
        <Descriptions.Item label="Địa chỉ" span={2}>{patientDetail.address}</Descriptions.Item>
        <Descriptions.Item label="Mô tả" span={2}>{patientDetail.description || 'Không có'}</Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}