'use client'
import { useEffect } from "react"
import { useRouter } from "next/navigation"
const PricePage = () => {
    const router = useRouter()
    useEffect(() => {
        router.push("/")        
    },[router])
    return (
        <div>
            redirecting to main page then scroll down
        </div>
    )
}

export default PricePage;