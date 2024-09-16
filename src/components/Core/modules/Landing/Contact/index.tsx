'use client'
import React from 'react'

import CommonSection from '@/components/Core/common/CommonSection'

import { useRef } from 'react'
import { Editor} from '@tinymce/tinymce-react'

function Contact() {
    const editorRef = useRef<any>(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent())
        }
    }
    return (
        <div>
            <CommonSection
                title={'địa chỉ - thông tin - liên hệ'}
                subtile={'Khu đô thị FPT City, Ngũ Hành Sơn, Đà Nẵng, Việt Nam'}
                tailCustomStyle="bg-gradient-to-b npm install --save @tinymce/tinymce-reactfrom-white to-secondaryLight"
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
                        <div className="flex h-fit w-1/2 flex-col gap-[10px]">
                            {' '}
                            <p className="text-end text-secondaryDark">
                                Thời gian hoạt động
                            </p>
                            <div className="h-[348px] w-full rounded-xl border-2 border-dashed border-secondaryDark bg-white"></div>
                        </div>
                    </div>
                    <div className="h-fit w-full">
                        <Editor
                            onInit={(_, editor) => {editorRef.current = editor}}
                            ref={editorRef}
                            apiKey="kf6v30dw6u6pqnzquj9slxf6eb3a3o1fauu1it6whe4zy9l6"
                            init={{
                                height: 200,
                                statusbar: false,
                                plugins: [
                                    // Core editing features
                                    'anchor',
                                    'autolink',
                                    'charmap',
                                    'codesample',
                                    'emoticons',
                                    'image',
                                    'link',
                                    'lists',
                                    'media',
                                    'searchreplace',
                                    'table',
                                    'visualblocks',
                                    'wordcount',
                                    // Your account includes a free trial of TinyMCE premium features
                                    // Try the most popular premium features until Sep 30, 2024:
                                    'checklist',
                                    'mediaembed',
                                    'casechange',
                                    'export',
                                    'formatpainter',
                                    'pageembed',
                                    'a11ychecker',
                                    'tinymcespellchecker',
                                    'permanentpen',
                                    'powerpaste',
                                    'advtable',
                                    'advcode',
                                    'editimage',
                                    'advtemplate',
                                    'ai',
                                    'mentions',
                                    'tinycomments',
                                    'tableofcontents',
                                    'footnotes',
                                    'mergetags',
                                    'autocorrect',
                                    'typography',
                                    'inlinecss',
                                    'markdown',
                                ],
                                menubar: false,
                                toolbar:
                                    'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                tinycomments_mode: 'embedded',
                                tinycomments_author: 'Author name',
                                mergetags_list: [
                                    {
                                        value: 'First.Name',
                                        title: 'First Name',
                                    },
                                    { value: 'Email', title: 'Email' },
                                ],
                                ai_request: (request: any, respondWith: any) =>
                                    respondWith.string(() =>
                                        Promise.reject(
                                            'See docs to implement AI Assistant',
                                        ),
                                    ),
                            }}
                        ></Editor>
                        <button onClick={log}>Log editor content</button>
                    </div>
                </div>
            </CommonSection>
        </div>
    )
}

export default Contact
