import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SectionCard({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="px-5 py-4 border-b border-gray-50">
      <p className="text-sm font-semibold text-gray-800">{title}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
    </div>
  );
}

function SettingRow({ icon, label, description, children }) {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50 last:border-0 gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <img src={icon} alt={label} className="w-5 h-5 shrink-0" />
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-700">{label}</p>
          {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
        </div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ enabled, onChange }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className="relative w-10 h-5 rounded-full transition-colors duration-200 focus:outline-none"
      style={{ background: enabled ? "#111827" : "#e5e7eb" }}
    >
      <span
        className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
        style={{ transform: enabled ? "translateX(20px)" : "translateX(0)" }}
      />
    </button>
  );
}

function PrivacyModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <p className="text-sm font-semibold text-gray-800">Privacy Policy</p>
            <p className="text-xs text-gray-400">Last updated: February 2026</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-500 text-sm"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-4 space-y-4 text-sm text-gray-600 leading-relaxed">
          {[
            {
              title: "1. Information We Collect",
              body: "We collect information you provide directly to us, such as when you create an account, record transactions, or contact support. This includes your name, email address, business details, and transaction data.",
            },
            {
              title: "2. How We Use Your Information",
              body: "We use the information we collect to operate and improve our services, process your transactions, send you technical notices and support messages, and respond to your comments and questions.",
            },
            {
              title: "3. Data Storage & Security",
              body: "Your data is stored securely on encrypted servers. We implement industry-standard security measures to protect your information from unauthorized access, alteration, disclosure, or destruction.",
            },
            {
              title: "4. Sharing of Information",
              body: "We do not sell, trade, or otherwise transfer your personal information to third parties. This does not include trusted third parties who assist us in operating our platform, as long as those parties agree to keep this information confidential.",
            },
            {
              title: "5. Cookies",
              body: "We use cookies to enhance your experience, analyze site traffic, and understand where our visitors are coming from. You may choose to disable cookies through your browser settings.",
            },
            {
              title: "6. Your Rights",
              body: "You have the right to access, correct, or delete your personal data at any time. You may also request a copy of the data we hold about you by contacting our support team.",
            },
            {
              title: "7. Changes to This Policy",
              body: "We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the date at the top.",
            },
            {
              title: "8. Contact Us",
              body: "If you have any questions about this privacy policy or our data practices, please contact us at support@yourapp.com.",
            },
          ].map((s) => (
            <div key={s.title}>
              <p className="font-semibold text-gray-700 mb-1">{s.title}</p>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-gray-50">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

function LogoutModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <img src="/icons/logout.svg" alt="logout" className="w-7 h-7" />
        </div>
        <p className="text-base font-semibold text-gray-800 mb-1">Log out?</p>
        <p className="text-sm text-gray-400 mb-6">
          You'll need to sign in again to access your account.
        </p>
        <div className="flex gap-3 w-full">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Settings() {
  const navigate = useNavigate();

  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const [toggles, setToggles] = useState({
    twoFactor: false,
    dataSharing: false,
  });

  const setToggle = (key) => (val) =>
    setToggles((prev) => ({ ...prev, [key]: val }));

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="w-full h-full flex flex-col gap-5">
      
      <SectionCard>
        <SectionHeader title="Security & Privacy" subtitle="Keep your account safe" />
        <SettingRow icon="../../assets/icons/bell.svg" label="Two-Factor Authentication" description="Add an extra layer of security">
          <Toggle enabled={toggles.twoFactor} onChange={setToggle("twoFactor")} />
        </SettingRow>
        <SettingRow icon="/icons/data-sharing.svg" label="Data Sharing" description="Help improve the app with usage data">
          <Toggle enabled={toggles.dataSharing} onChange={setToggle("dataSharing")} />
        </SettingRow>
        <SettingRow icon="/icons/privacy.svg" label="Privacy Policy" description="Read how we handle your data">
          <button
            onClick={() => setShowPrivacy(true)}
            className="text-xs text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            View
          </button>
        </SettingRow>
      </SectionCard>

     
      <SectionCard>
        <SectionHeader title="Session" />
        <div className="px-5 py-4">
          <button
            onClick={() => setShowLogout(true)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-red-100 bg-red-50 text-red-500 text-sm font-semibold hover:bg-red-100 hover:border-red-200 transition-all duration-150"
          >
            <img src="/icons/logout.svg" alt="logout" className="w-4 h-4" /> Log Out
          </button>
        </div>
      </SectionCard>

     
      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
      {showLogout && (
        <LogoutModal
          onConfirm={handleLogout}
          onCancel={() => setShowLogout(false)}
        />
      )}
    </div>
  );
}