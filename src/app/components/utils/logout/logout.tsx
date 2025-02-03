'use server'

import Apis from "@/app/service/hooks/ApiSlugs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function logout() {
    const cookiesHeader = cookies()
    const api = Apis()
    await api.Logout()
    cookiesHeader.delete("authorization")
    redirect("/")
}

