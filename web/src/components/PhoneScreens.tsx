"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronLeft, Landmark, QrCode, ScanLine, Send, ShieldCheck, Signal, Wifi, BatteryFull } from "lucide-react";
import { easeOut, useReduce } from "./ui";

/** Illustrative NexusPay-style screens. All names, numbers and amounts are synthetic demo data. */
export function Phone({ step }: { step: number }) {
  const reduce = useReduce();
  return (
    <div className="relative mx-auto aspect-[9/19] w-[min(19rem,72vw)]">
      <div className="absolute inset-0 rounded-[3rem] bg-[#0b0d26] p-[10px] shadow-[0_2px_0_1px_rgb(255_255_255/0.08)_inset,0_50px_100px_-30px_rgb(0_0_0/0.7),0_30px_60px_-30px_rgb(37_42_134/0.8)] ring-1 ring-white/10">
        <div className="relative h-full overflow-hidden rounded-[2.4rem] bg-paper">
          {/* status bar */}
          <div className="flex h-11 items-center justify-between px-6 text-[11px] font-semibold text-ink">
            <span className="tabular">9:41</span>
            <span className="absolute left-1/2 top-2.5 h-6 w-24 -translate-x-1/2 rounded-full bg-[#0b0d26]" />
            <span className="flex items-center gap-1">
              <Signal className="size-3" aria-hidden />
              <Wifi className="size-3" aria-hidden />
              <BatteryFull className="size-3.5" aria-hidden />
            </span>
          </div>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={step}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: 40, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -40, filter: "blur(4px)" }}
              transition={{ duration: 0.55, ease: easeOut }}
              className="absolute inset-x-0 bottom-0 top-11"
            >
              {step === 0 && <SendScreen />}
              {step === 1 && <QrScreen />}
              {step === 2 && <CardlessScreen />}
              {step === 3 && <VirtualCardScreen />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function TopBar({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 px-5 pb-3 pt-1">
      <ChevronLeft className="size-4 text-ink-2" aria-hidden />
      <span className="text-[13px] font-bold text-ink">{title}</span>
    </div>
  );
}

function SendScreen() {
  return (
    <div className="flex h-full flex-col">
      <TopBar title="Send Money" />
      <div className="mx-4 rounded-2xl bg-indigo-600 p-4 text-white">
        <p className="text-[10px] text-indigo-200">Available balance</p>
        <p className="tabular mt-1 text-xl font-bold">৳ 48,250.00</p>
      </div>
      <div className="mx-4 mt-4 space-y-2.5">
        <div className="rounded-xl bg-white p-3 shadow-sm">
          <p className="text-[10px] text-ink-3">To mobile number</p>
          <p className="tabular mt-0.5 text-[13px] font-semibold text-ink">+880 17•• ••• 214</p>
        </div>
        <div className="rounded-xl bg-white p-3 shadow-sm">
          <p className="text-[10px] text-ink-3">Amount</p>
          <p className="tabular mt-0.5 text-2xl font-bold text-ink">৳ 2,500</p>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-green-100 px-3 py-2.5 text-[11px] font-semibold text-green-700">
          <span>Charge</span>
          <span className="tabular">৳ 0.00</span>
        </div>
      </div>
      <div className="mx-4 mt-4">
        <p className="text-[10px] font-semibold text-ink-3">Recent</p>
        <div className="mt-2 flex justify-between">
          {[
            ["Ammu", "bg-rocket-100 text-rocket"],
            ["Rafi", "bg-indigo-100 text-indigo-700"],
            ["Nabila", "bg-green-100 text-green-700"],
            ["Shop", "bg-lime text-indigo-950"],
          ].map(([n, c]) => (
            <div key={n} className="flex flex-col items-center gap-1">
              <span className={`grid size-9 place-items-center rounded-full text-[12px] font-bold ${c}`}>{n[0]}</span>
              <span className="text-[9px] font-medium text-ink-2">{n}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto p-4">
        <div className="flex h-11 items-center justify-center gap-2 rounded-full bg-indigo-600 text-[13px] font-bold text-white">
          <Send className="size-3.5" aria-hidden /> Send now
        </div>
      </div>
    </div>
  );
}

function QrScreen() {
  const reduce = useReduce();
  return (
    <div className="flex h-full flex-col bg-indigo-950 text-white">
      <div className="flex items-center gap-2 px-5 pb-3 pt-1">
        <ChevronLeft className="size-4 text-indigo-200" aria-hidden />
        <span className="text-[13px] font-bold">Scan & Pay</span>
      </div>
      <div className="relative mx-auto mt-4 aspect-square w-[72%]">
        {["left-0 top-0 border-l-4 border-t-4 rounded-tl-2xl", "right-0 top-0 border-r-4 border-t-4 rounded-tr-2xl", "left-0 bottom-0 border-l-4 border-b-4 rounded-bl-2xl", "right-0 bottom-0 border-r-4 border-b-4 rounded-br-2xl"].map((c) => (
          <span key={c} className={`absolute size-10 border-lime ${c}`} />
        ))}
        <div className="absolute inset-6 grid place-items-center rounded-xl bg-white">
          <QrCode className="size-[70%] text-indigo-950" strokeWidth={1.4} aria-hidden />
        </div>
        <motion.span
          className="absolute inset-x-4 h-0.5 rounded-full bg-lime shadow-[0_0_14px_2px_rgb(200_241_105/0.7)]"
          animate={reduce ? undefined : { top: ["12%", "86%", "12%"] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "50%" }}
        />
      </div>
      <div className="mx-4 mt-auto mb-4 rounded-2xl bg-white p-4 text-ink">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-ink-3">Paying</p>
            <p className="text-[13px] font-bold">Corner Grocery (demo)</p>
          </div>
          <p className="tabular text-lg font-bold">৳ 640</p>
        </div>
        <div className="mt-3 flex gap-2 text-[10px] font-semibold">
          <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-indigo-700">QR</span>
          <span className="rounded-full bg-paper px-2.5 py-1 text-ink-2">NFC tap</span>
        </div>
      </div>
    </div>
  );
}

function CardlessScreen() {
  return (
    <div className="flex h-full flex-col">
      <TopBar title="Cardless Cash" />
      <div className="mx-4 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
        <span className="grid size-9 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
          <Landmark className="size-4" aria-hidden />
        </span>
        <div>
          <p className="text-[10px] text-ink-3">Withdraw at any DBBL ATM</p>
          <p className="tabular text-[13px] font-bold text-ink">৳ 5,000</p>
        </div>
      </div>
      <div className="mx-4 mt-5 rounded-2xl bg-indigo-600 p-5 text-center text-white">
        <p className="text-[10px] text-indigo-200">Your one-time code</p>
        <p className="tabular mt-2 text-[28px] font-bold tracking-[0.12em]">4829 1156</p>
        <p className="mt-2 text-[10px] text-indigo-200">Enter this at the ATM</p>
      </div>
      <div className="mx-4 mt-4 flex items-center gap-2 rounded-xl bg-paper p-3 text-[11px] text-ink-2 ring-1 ring-inset ring-line">
        <ScanLine className="size-4 text-indigo-500" aria-hidden /> Rolling out across the network
      </div>
      <div className="mt-auto p-4">
        <div className="flex h-11 items-center justify-center rounded-full bg-indigo-950 text-[13px] font-bold text-white">Done</div>
      </div>
    </div>
  );
}

function VirtualCardScreen() {
  return (
    <div className="flex h-full flex-col">
      <TopBar title="Temporary Card" />
      <div className="relative mx-4 aspect-[1.6/1] overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#252a86,#0e1150)] p-4 text-white">
        <span className="absolute -right-10 -top-12 size-36 rounded-full border-[18px] border-white/8" />
        <p className="text-[10px] font-semibold text-indigo-200">Online-only · single use</p>
        <p className="tabular mt-6 text-[15px] font-bold tracking-[0.14em]">5412 •••• •••• 7730</p>
        <div className="mt-3 flex justify-between text-[10px] text-indigo-200">
          <span>EXP 11/26</span>
          <span>CVV •••</span>
        </div>
      </div>
      <div className="mx-4 mt-4 rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold text-ink-2">Expires in</p>
          <p className="tabular text-xl font-bold text-ink">09:58</p>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-indigo-50">
          <div className="h-full w-[97%] rounded-full bg-green-600" />
        </div>
      </div>
      <div className="mx-4 mt-3 flex items-center gap-2 text-[11px] font-semibold text-green-700">
        <ShieldCheck className="size-4" aria-hidden /> Your real card number stays private
      </div>
      <div className="mt-auto p-4">
        <div className="flex h-11 items-center justify-center gap-2 rounded-full bg-indigo-600 text-[13px] font-bold text-white">
          <Check className="size-3.5" aria-hidden /> Copy number
        </div>
      </div>
    </div>
  );
}
