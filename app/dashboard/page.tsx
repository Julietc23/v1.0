"use client"

import { useState } from "react"
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar"
import { UserCog, Settings, Database } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { DatabaseTable } from "@/components/database-table"
import { AddDatabaseDialog } from "@/components/add-database-dialog"
import { Button } from "@/components/ui/button"
import { ChatInterface } from "@/components/chat-interface"
import ProfilePage from "./profile/page"
import SettingsPage from "./settings/page"
import MouseMoveEffect from "@/components/mouse-move-effect"
import { LogoutDialog } from "@/components/logout-dialog"

const links = [
  {
    label: "Bases de Datos",
    href: "/dashboard/databases",
    icon: <Database className="text-neutral-700 dark:text-neutral-200 h-5 w-5" />,
  },
  {
    label: "Perfil",
    href: "/dashboard/profile",
    icon: <UserCog className="text-neutral-700 dark:text-neutral-200 h-5 w-5" />,
  },
  {
    label: "Configuración",
    href: "/dashboard/settings",
    icon: <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5" />,
  },
]

export default function DashboardPage() {
  const [open, setOpen] = useState(false)
  const [databases, setDatabases] = useState<any[]>([])
  const [selectedDatabase, setSelectedDatabase] = useState<string | null>(null)
  const [currentView, setCurrentViewState] = useState("databases")
  const [showChat, setShowChat] = useState(false)

  const handleAddDatabase = (newDatabase: any) => {
    const newDb = {
      id: String(databases.length + 1),
      ...newDatabase,
    }
    setDatabases([...databases, newDb])
  }

  const handleConnect = () => {
    if (selectedDatabase) {
      const database = databases.find((db) => db.id === selectedDatabase)
      if (database) {
        setShowChat(true)
      }
    }
  }

  const handleViewChange = (href: string) => {
    const view = href.split("/").pop() || "databases"
    setCurrentViewState(view)
    setShowChat(false)
  }

  const renderView = () => {
    if (showChat && selectedDatabase) {
      const database = databases.find((db) => db.id === selectedDatabase)
      return (
        <div className="h-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Chat - {database?.name}</h1>
            <Button variant="outline" onClick={() => setShowChat(false)}>
              Volver
            </Button>
          </div>
          <ChatInterface
            databaseName={database?.name}
            databaseType={database?.type}
            databasePath={database?.path || database?.host}
          />
        </div>
      )
    }

    switch (currentView) {
      case "databases":
        return (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Bases de Datos</h1>
              <AddDatabaseDialog onAddDatabase={handleAddDatabase} />
            </div>
            <DatabaseTable
              databases={databases}
              selectedDatabase={selectedDatabase}
              onSelectDatabase={setSelectedDatabase}
            />
            <div className="flex justify-end mt-4">
              <Button onClick={handleConnect} disabled={!selectedDatabase}>
                Conectar
              </Button>
            </div>
          </>
        )
      case "profile":
        return <ProfilePage />
      case "settings":
        return <SettingsPage />
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-50 to-white dark:from-neutral-950 dark:to-neutral-900">
      <MouseMoveEffect />
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-neutral-900 dark:via-neutral-800/50 dark:to-neutral-900 border-r border-gray-200 dark:border-neutral-800">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  onClick={() => handleViewChange(link.href)}
                  className="hover:bg-gradient-to-r hover:from-pink-500/5 hover:via-purple-500/5 hover:to-indigo-600/5 rounded-md transition-colors duration-300"
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <LogoutDialog />
            {open && <ThemeToggle />}
          </div>
        </SidebarBody>
      </Sidebar>
      <main className="flex-1 p-8 overflow-auto bg-gradient-to-b from-gray-50/50 to-white dark:from-neutral-900/50 dark:to-neutral-900">
        {renderView()}
      </main>
    </div>
  )
}

const Logo = () => {
  return (
    <Link href="/" className="font-normal flex items-center space-x-3 py-2 px-2 relative z-20">
      <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 p-[1px]">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 opacity-40 blur-lg" />
        <div className="relative h-full w-full rounded-[7px] bg-white dark:bg-neutral-950 flex items-center justify-center">
          <span className="text-lg font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
            S
          </span>
        </div>
      </div>
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-bold text-xl whitespace-pre">
        <span className="text-black dark:text-white">sQloud</span>
        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
          AI
        </span>
      </motion.span>
    </Link>
  )
}

const LogoIcon = () => {
  return (
    <Link href="/" className="flex items-center py-2 px-2 relative z-20">
      <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 p-[1px]">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 opacity-40 blur-lg" />
        <div className="relative h-full w-full rounded-[7px] bg-white dark:bg-neutral-950 flex items-center justify-center">
          <span className="text-lg font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
            S
          </span>
        </div>
      </div>
    </Link>
  )
}

