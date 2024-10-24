import { Modal, Tag } from "antd";
import { useSearchParams } from "next/navigation";
import { User } from "..";
import Image from "next/image";


type TProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    refetch: () => void
    doctorDetail: User
}
export default function ViewDoctor({ open, setOpen, refetch, doctorDetail }: TProps) {

    const searchParam = useSearchParams();
    console.log(doctorDetail);
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            centered
            title={
                <>
                    <div>
                        <p className="text-[20px] font-semibold text-secondarySupperDarker">
                            Thông tin chi tiết
                        </p>
                    </div>
                </>
            }
            className="w-[90%] md:w-[60%] mx-auto"
            footer={null}
        >
            <div className="grid md:grid-cols-2 w-full">
                {/* Avatar and Basic Info */}
                <div className="flex flex-col items-center">
                    <Image
                        src={doctorDetail.avatarUrl || "/default-avatar.png"}
                        alt={doctorDetail.fullName || "Doctor"}
                        className="w-32 h-32 rounded-full object-cover mb-4"
                        height={128}
                        width={128}
                    />
                    <p className="text-xl font-semibold">{doctorDetail.fullName || "Unknown Doctor"}</p>
                    <p className="text-sm text-gray-500">{doctorDetail.position?.name || "No position"}</p>
                    <p className="text-sm text-gray-500">{doctorDetail.gender?.name}</p>
                    <p className="text-sm text-gray-500">{doctorDetail.dob}</p>
                </div>

                {/* Contact and Specialty Info */}
                <div className="flex flex-col justify-between">
                    <div className="mb-4">
                        <p className="text-lg font-semibold">Contact Information</p>
                        <p className="text-sm">Phone: {doctorDetail.phoneNumber || "N/A"}</p>
                        <p className="text-sm">Address: {doctorDetail.address || "N/A"}</p>
                    </div>

                    <div className="mb-4">
                        <p className="text-lg font-semibold">Specialties</p>
                        <div className="flex flex-wrap gap-2">
                            {doctorDetail.specialty.map((specialty) => (
                                <Tag color="blue" key={specialty.id}>
                                    {specialty.name}
                                </Tag>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <p className="text-lg font-semibold">On Duty</p>
                        <p className="text-sm">{doctorDetail.isOnDuty ? "Yes" : "No"}</p>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <p className="text-lg font-semibold">Description</p>
                <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: doctorDetail.description || "No description provided." }}></p>
            </div>

            <div className="mt-4">
                <p className="text-lg font-semibold">Achievements</p>
                <p className="text-sm text-gray-700">{doctorDetail.achievement || "No achievements provided."}</p>
            </div>
            
        </Modal>
    )
}