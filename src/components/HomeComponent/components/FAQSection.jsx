import React from 'react'
import { CustomAccordian } from '../../../inputs/CustomAccordian'
import _ from 'lodash'

export const FAQSection = () => {

    const faqs = [
        {
            question: "Are the nutrition labels FDA compliant?",
            answer:
                "Yes, all our nutrition label formats meet current FDA requirements and regulations. We stay updated with the latest FDA guidelines to ensure your labels are compliant for commercial use.",
        },
        {
            question: "What file formats can I export my nutrition labels in?",
            answer:
                "You can export your nutrition labels in multiple formats including PDF (print-ready), PNG (high-resolution), SVG (scalable vector), and JPG (compressed image). All formats are suitable for professional printing and digital use.",
        },
        {
            question: "Do I need to create an account to use the nutrition label generator?",
            answer:
                "No account creation is required to use the basic features. However, providing your email address allows you to save your progress and receive download links for your completed labels.",
        },
        {
            question: "How do I calculate the nutritional values for my product?",
            answer:
                "You'll need to have your product analyzed by a certified laboratory or use FDA-approved nutrition analysis software. We recommend consulting with a food scientist or nutritionist to ensure accuracy of your nutritional data.",
        },
        {
            question: "Can I use these labels for commercial products?",
            answer:
                "Yes, the labels generated are suitable for commercial use. However, you are responsible for ensuring the accuracy of the nutritional information and compliance with all applicable regulations in your jurisdiction.",
        },
        {
            question: "What's the difference between the various label formats?",
            answer:
                "Different formats are designed for different package sizes and product types. Standard vertical works for most products, horizontal for wide packages, tabular for limited space, and specialized formats for infant formula, dietary supplements, etc.",
        },
        {
            question: "How do I determine serving sizes for my product?",
            answer:
                "Serving sizes should be based on FDA Reference Amounts Customarily Consumed (RACC) for your product category. The FDA provides detailed guidance on appropriate serving sizes for different food categories.",
        },
        {
            question: "Can I edit a saved nutrition label?",
            answer:
                "Yes, when you save your progress with an email address, you'll receive a link that allows you to return and edit your nutrition label at any time.",
        },
        {
            question: "What if I need help with my nutrition label?",
            answer:
                "Our team at ePackageSupply is here to help! Contact us at (888) 631-0888 or service@epackagesupply.com for assistance with your nutrition labeling needs.",
        },
        {
            question: "Is this nutrition label generator really free?",
            answer:
                "Yes! This nutrition label generator is completely free to use with no hidden costs, no credit card required, and no sign-up needed. You can create unlimited nutrition labels and export them in multiple formats at no charge. This is part of our commitment to supporting businesses of all sizes with professional packaging solutions.",
        },
    ]

    return (
        <section className='bg-gray-50 py-16 mt-16'>
            <div className='container mx-auto px-4'>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black text-primaryTextColor mb-4">Frequently Asked Questions</h2>
                    <p className="text-lg text-primaryTextColor font-light max-w-2xl mx-auto">Get answers to common questions about creating FDA-compliant nutrition labels</p>
                </div>
                <div className='max-w-4xl mx-auto'>
                    <div className='space-y-4'>
                        {_.map(faqs, ({ question, answer }, i) => (<CustomAccordian key={"accordion" + i} Question={question} Answer={answer} />))}
                    </div>
                </div>
            </div>
        </section>
    )
}
