"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import LogoutButton from "./LogoutButton"

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/home",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/student.png",
        label: "Students",
        visible: ["admin", "teacher"],
        children: [
          {
            label: "Student List",
            href: "/student",
            visible: ["admin", "teacher"],
          },
          {
            label: "Class Assign",
            href: "/student/class-assign",
            visible: ["admin", "teacher"],
          },
          {
            label: "Class Transfer",
            href: "/student/transfer",
            visible: ["admin", "teacher"],
          },
        ],
      },
      {
        icon: "/Inv.png",
        label: "Fee Voucher",
        href: "/feeVoucher",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/receipt.png",
        label: "Receipt Voucher",
        href: "/payment",
        visible: ["admin", "teacher"],
      },
    ],
  },
  {
    title: "ADMINISTRATION",
    items: [
      {
        icon: "/session.png",
        label: "Session",
        href: "/session",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/classmaster.png",
        label: "Class",
        href: "/classMaster",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/exam.png",
        label: "Payment Month",
        href: "/paymentMonth",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/menu.png",
        label: "Category Master",
        href: "/category",
        visible: ["admin", "teacher"],
      },
    ],  
  },
]

// MenuItem Component
const MenuItem = ({ item, currentRole }: { item: any; currentRole: string }) => {
  const hasChildren = Array.isArray(item.children) && item.children.length > 0
  const [expanded, setExpanded] = useState(false)

  if (hasChildren) {
    return (
      <div className="mb-1">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between w-full text-left gap-2 text-muted-foreground py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
        >
          <div className="flex items-center gap-2">
            {item.icon && (
              <Image
                className="dark:invert"
                src={item.icon}
                alt=""
                width={20}
                height={20}
              />
            )}
            <span className="hidden lg:block text-secondary-foreground">{item.label}</span>
          </div>
          <span
            className={`transition-transform duration-200 transform ${
              expanded ? "rotate-90" : ""
            }`}
          >
            ▶
          </span>
        </button>

        {expanded && (
          <div className="ml-8 mt-1 flex flex-col gap-1">
            {item.children.map(
              (child: any) =>
                child.visible.includes(currentRole) && (
                  <Link
                    key={child.label}
                    href={child.href}
                    className="flex items-center gap-2 text-secondary-foreground py-1 px-2 rounded-md hover:bg-lamaSkyLight text-sm"
                  >
                    <span>→</span>
                    <span className="hidden lg:block">{child.label}</span>
                  </Link>
                )
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <Link
      href={item.href}
      key={item.label}
      className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground py-1 md:px-2 rounded-md hover:bg-lamaSkyLight"
    >
      {item.icon && (
        <Image
          className="dark:invert"
          src={item.icon}
          alt=""
          width={20}
          height={20}
        />
      )}
      <span className="hidden lg:block text-secondary-foreground">{item.label}</span>
    </Link>
  )
}

// Main Menu Component
const Menu = () => {
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    const session = localStorage.getItem("session")
    if (session) {
      const user = JSON.parse(session)
      setRole(user.role.toLowerCase()) // e.g. "ADMIN" → "admin"
    }
  }, [])

  if (!role) return <div className="p-4 text-muted">Loading menu...</div>

  return (
    <div className=" text-sm">
      {menuItems.map((section) => (
        <div className="flex flex-col gap-2" key={section.title}>
          <span className="hidden lg:block text-secondary-foreground font-light my-4">
            {section.title}
          </span>
          {section.items.map(
            (item) =>
              item.visible.includes(role) &&
              <MenuItem key={item.label} item={item} currentRole={role} />
          )}
        </div>
      ))}

      
    </div>
  )
}

export default Menu
