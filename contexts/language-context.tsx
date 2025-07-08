"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type Language = "en" | "es" | "fr" | "de" | "zh"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.vendors": "Vendors",
    "nav.categories": "Categories",
    "nav.dashboard": "Dashboard",
    "nav.profile": "Profile",
    "nav.orders": "Orders",
    "nav.login": "Login",
    "nav.register": "Register",
    "nav.logout": "Logout",
    "common.search": "Search...",
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.view": "View",
    "common.add": "Add",
    "common.remove": "Remove",
    "common.update": "Update",
    "common.create": "Create",
    "common.submit": "Submit",
    "common.confirm": "Confirm",
    "common.back": "Back",
    "common.next": "Next",
    "common.previous": "Previous",
    "common.close": "Close",
    "common.open": "Open",
    "common.yes": "Yes",
    "common.no": "No",
  },
  es: {
    "nav.home": "Inicio",
    "nav.products": "Productos",
    "nav.vendors": "Vendedores",
    "nav.categories": "Categorías",
    "nav.dashboard": "Panel",
    "nav.profile": "Perfil",
    "nav.orders": "Pedidos",
    "nav.login": "Iniciar Sesión",
    "nav.register": "Registrarse",
    "nav.logout": "Cerrar Sesión",
    "common.search": "Buscar...",
    "common.loading": "Cargando...",
    "common.error": "Error",
    "common.success": "Éxito",
    "common.cancel": "Cancelar",
    "common.save": "Guardar",
    "common.delete": "Eliminar",
    "common.edit": "Editar",
    "common.view": "Ver",
    "common.add": "Agregar",
    "common.remove": "Quitar",
    "common.update": "Actualizar",
    "common.create": "Crear",
    "common.submit": "Enviar",
    "common.confirm": "Confirmar",
    "common.back": "Atrás",
    "common.next": "Siguiente",
    "common.previous": "Anterior",
    "common.close": "Cerrar",
    "common.open": "Abrir",
    "common.yes": "Sí",
    "common.no": "No",
  },
  fr: {
    "nav.home": "Accueil",
    "nav.products": "Produits",
    "nav.vendors": "Vendeurs",
    "nav.categories": "Catégories",
    "nav.dashboard": "Tableau de bord",
    "nav.profile": "Profil",
    "nav.orders": "Commandes",
    "nav.login": "Connexion",
    "nav.register": "S'inscrire",
    "nav.logout": "Déconnexion",
    "common.search": "Rechercher...",
    "common.loading": "Chargement...",
    "common.error": "Erreur",
    "common.success": "Succès",
    "common.cancel": "Annuler",
    "common.save": "Sauvegarder",
    "common.delete": "Supprimer",
    "common.edit": "Modifier",
    "common.view": "Voir",
    "common.add": "Ajouter",
    "common.remove": "Retirer",
    "common.update": "Mettre à jour",
    "common.create": "Créer",
    "common.submit": "Soumettre",
    "common.confirm": "Confirmer",
    "common.back": "Retour",
    "common.next": "Suivant",
    "common.previous": "Précédent",
    "common.close": "Fermer",
    "common.open": "Ouvrir",
    "common.yes": "Oui",
    "common.no": "Non",
  },
  de: {
    "nav.home": "Startseite",
    "nav.products": "Produkte",
    "nav.vendors": "Verkäufer",
    "nav.categories": "Kategorien",
    "nav.dashboard": "Dashboard",
    "nav.profile": "Profil",
    "nav.orders": "Bestellungen",
    "nav.login": "Anmelden",
    "nav.register": "Registrieren",
    "nav.logout": "Abmelden",
    "common.search": "Suchen...",
    "common.loading": "Laden...",
    "common.error": "Fehler",
    "common.success": "Erfolg",
    "common.cancel": "Abbrechen",
    "common.save": "Speichern",
    "common.delete": "Löschen",
    "common.edit": "Bearbeiten",
    "common.view": "Ansehen",
    "common.add": "Hinzufügen",
    "common.remove": "Entfernen",
    "common.update": "Aktualisieren",
    "common.create": "Erstellen",
    "common.submit": "Senden",
    "common.confirm": "Bestätigen",
    "common.back": "Zurück",
    "common.next": "Weiter",
    "common.previous": "Vorherige",
    "common.close": "Schließen",
    "common.open": "Öffnen",
    "common.yes": "Ja",
    "common.no": "Nein",
  },
  zh: {
    "nav.home": "首页",
    "nav.products": "产品",
    "nav.vendors": "商家",
    "nav.categories": "分类",
    "nav.dashboard": "仪表板",
    "nav.profile": "个人资料",
    "nav.orders": "订单",
    "nav.login": "登录",
    "nav.register": "注册",
    "nav.logout": "退出",
    "common.search": "搜索...",
    "common.loading": "加载中...",
    "common.error": "错误",
    "common.success": "成功",
    "common.cancel": "取消",
    "common.save": "保存",
    "common.delete": "删除",
    "common.edit": "编辑",
    "common.view": "查看",
    "common.add": "添加",
    "common.remove": "移除",
    "common.update": "更新",
    "common.create": "创建",
    "common.submit": "提交",
    "common.confirm": "确认",
    "common.back": "返回",
    "common.next": "下一个",
    "common.previous": "上一个",
    "common.close": "关闭",
    "common.open": "打开",
    "common.yes": "是",
    "common.no": "否",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    if (mounted) {
      localStorage.setItem("language", newLanguage)
    }
  }

  const t = (key: string): string => {
    if (!mounted) return key
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
