import CommonSection from '@/components/Core/common/CommonSection'
import React from 'react'

function Contact() {
    return (
        <div>
            <CommonSection
                title={'địa chỉ - thông tin - liên hệ'}
                subtile={'Khu đô thị FPT City, Ngũ Hành Sơn, Đà Nẵng, Việt Nam'}
                tailCustomStyle="bg-gradient-to-b from-white to-secondaryLight"
            >
                <div className="flex flex-col gap-[40px]">
                    <div className="flex flex-row gap-[30px]">
                        <div className="flex h-fit w-1/2 flex-col gap-[10px]">
                            <p className="text-secondaryDark">Google Map</p>
                            <div className="h-[348px] w-full rounded-xl border-2 border-secondaryDark bg-white">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7758.582575832668!2d108.26293834401795!3d15.969150793416244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142116949840599%3A0x365b35580f52e8d5!2sFPT%20University%20Danang!5e1!3m2!1sen!2s!4v1726468311414!5m2!1sen!2s"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="h-full w-full rounded-lg"
                                ></iframe>
                            </div>
                        </div>
                        <div className="h-fit w-1/2  flex flex-col gap-[10px]">
                            {' '}
                            <p className="text-secondaryDark text-end">Thời gian hoạt động</p>
                            <div className="h-[348px] w-full rounded-xl border-2 border-secondaryDark border-dashed bg-white">
                             
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
            </CommonSection>
        </div>
    )
}

export default Contact
