import React from 'react'

export const WhyChooseSupply = () => {
    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black text-primaryTextColor mb-4">Why Choose ePackageSupply?</h2>
                    <p className="text-lg text-primaryTextColor font-light max-w-2xl mx-auto">We're your partner that scales at your pace, providing professional packaging solutions and tools</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-darkBlue rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-2xl font-black">1</span>
                        </div>
                        <h3 className="text-xl font-semibold text-primaryTextColor mb-2">FDA Compliant</h3>
                        <p className="text-primaryTextColor font-light">All label formats meet current FDA requirements and regulations</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-darkOrange rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-2xl font-black">2</span>
                        </div>
                        <h3 className="text-xl font-semibold text-primaryTextColor mb-2">Professional Quality</h3>
                        <p className="text-primaryTextColor font-light">Export high-resolution files ready for professional printing</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-2xl font-black">3</span>
                        </div>
                        <h3 className="text-xl font-semibold text-primaryTextColor mb-2">Easy to Use</h3>
                        <p className="text-primaryTextColor font-light">No design experience needed - just enter your data and export</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
