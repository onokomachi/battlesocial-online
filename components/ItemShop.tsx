/**
 * ItemShop.tsx — MP消費ショップ（装備管理・シールド・テーマ・消耗品）
 *
 * エビデンスB: Castronova (2005) 仮想経済バランス
 *   消費先の多様化がゲーム内経済の健全性を維持
 *
 * エビデンスB: Deci & Ryan (1985) 自己決定理論
 *   カスタマイズ = 自律性欲求の充足 → 内発的動機の維持
 */
import React, { useState } from 'react';
import { SHOP_ITEMS, TITLE_DEFS } from '../constants';
import type { ShopItemDef } from '../types';

interface ItemShopProps {
  socialPoints: number;
  ownedItems: Set<string>;
  equippedTitle: string | null;
  earnedTitleIds: Set<string>;
  equippedTheme: string | null;
  hintTokens: number;
  onPurchase: (item: ShopItemDef) => void;
  onEquipTitle: (titleId: string | null) => void;
  onEquipTheme: (id: string | null) => void;
  onClose: () => void;
}

type TabKey = 'equip' | 'streak_shield' | 'theme' | 'consumable';

const rarityBorder: Record<string, string> = {
  common: 'border-gray-600/40',
  rare: 'border-blue-500/40',
  epic: 'border-purple-500/40',
  legendary: 'border-amber-500/50',
};

const rarityBg: Record<string, string> = {
  common: 'bg-gray-900/20',
  rare: 'bg-blue-900/10',
  epic: 'bg-purple-900/10',
  legendary: 'bg-amber-900/10',
};

const rarityLabel: Record<string, { label: string; color: string }> = {
  common: { label: 'COMMON', color: 'text-gray-400' },
  rare: { label: 'RARE', color: 'text-blue-400' },
  epic: { label: 'EPIC', color: 'text-purple-400' },
  legendary: { label: 'LEGENDARY', color: 'text-amber-400' },
};

const ItemShop: React.FC<ItemShopProps> = ({
  socialPoints, ownedItems, equippedTitle, earnedTitleIds, equippedTheme,
  hintTokens, onPurchase, onEquipTitle, onEquipTheme, onClose,
}) => {
  const [tab, setTab] = useState<TabKey>('equip');
  const [purchaseMessage, setPurchaseMessage] = useState<string | null>(null);

  const handleBuy = (item: ShopItemDef) => {
    // 消耗品は複数購入可（hint_token以外はowned判定）
    const isConsumable = item.type === 'hint_token' || item.type === 'mp_booster' || item.type === 'exp_booster';
    if (!isConsumable && ownedItems.has(item.id)) return;
    if (socialPoints < item.cost) {
      setPurchaseMessage('MPが足りません');
      setTimeout(() => setPurchaseMessage(null), 2000);
      return;
    }
    onPurchase(item);
    setPurchaseMessage(`${item.name} を購入しました！`);
    setTimeout(() => setPurchaseMessage(null), 2000);
  };

  const tabs: { key: TabKey; label: string; icon: string }[] = [
    { key: 'equip', label: '装備管理', icon: '🎭' },
    { key: 'streak_shield', label: 'シールド', icon: '🛡️' },
    { key: 'theme', label: 'テーマ', icon: '🎨' },
    { key: 'consumable', label: '消耗品', icon: '⚗️' },
  ];

  const earnedTitles = TITLE_DEFS.filter(t => earnedTitleIds.has(t.id));

  const shieldItem = SHOP_ITEMS.find(i => i.type === 'streak_shield')!;
  const themeItems = SHOP_ITEMS.filter(i => i.type === 'theme');
  const consumableItems = SHOP_ITEMS.filter(i =>
    i.type === 'mp_booster' || i.type === 'hint_token' || i.type === 'exp_booster'
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-math-fade-in">
      <div className="w-full max-w-2xl mx-4 max-h-[90vh] bg-slate-950/95 border border-amber-500/30 rounded-2xl shadow-[0_0_60px_rgba(245,158,11,0.1)] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-900/20 via-orange-900/10 to-amber-900/20 p-5 border-b border-amber-500/20 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-white tracking-wider flex items-center gap-2">
                <span className="text-amber-400">🏪</span> アイテムショップ
              </h2>
              <p className="text-[10px] text-amber-400/70 mt-1 font-bold">
                称号は条件達成で自動付与。MPでアイテムを購入
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-slate-900/60 rounded-lg px-3 py-1.5 border border-amber-900/30">
                <span className="text-amber-400 font-black font-mono text-sm">{socialPoints.toLocaleString()} MP</span>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-white text-2xl transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-3">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                  tab === t.key
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-900/40 text-gray-500 border border-slate-700/30 hover:text-gray-300'
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Purchase message */}
        {purchaseMessage && (
          <div className="px-4 py-2 bg-amber-900/30 text-amber-300 text-sm text-center font-bold animate-math-fade-in">
            {purchaseMessage}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">

          {/* 装備管理タブ */}
          {tab === 'equip' && (
            <>
              {earnedTitles.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-3xl mb-3">🏷️</p>
                  <p className="text-sm font-bold">まだ称号がありません</p>
                  <p className="text-xs mt-1 text-gray-600">バトルや学習で条件を達成すると称号が付与されます</p>
                </div>
              ) : (
                earnedTitles.map(title => {
                  const rarity = title.rarity || 'common';
                  const equipped = equippedTitle === title.id;
                  const rl = rarityLabel[rarity];
                  return (
                    <div
                      key={title.id}
                      className={`rounded-lg p-3 border transition-colors ${rarityBorder[rarity]} ${rarityBg[rarity]}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl flex-shrink-0 w-10 text-center">{title.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-white text-sm font-bold">{title.name}</span>
                            {equipped && (
                              <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-bold">装備中</span>
                            )}
                            {title.isMonthly && (
                              <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">月次</span>
                            )}
                            <span className={`text-[9px] font-bold ${rl.color}`}>{rl.label}</span>
                          </div>
                          <p className="text-[10px] text-gray-500 mt-0.5">{title.description}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <button
                            onClick={() => onEquipTitle(equipped ? null : title.id)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                              equipped
                                ? 'border-gray-600 text-gray-400 hover:text-white'
                                : 'border-cyan-600/40 text-cyan-400 hover:bg-cyan-900/20'
                            }`}
                          >
                            {equipped ? '外す' : '装備'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </>
          )}

          {/* シールドタブ */}
          {tab === 'streak_shield' && (
            <div
              className={`rounded-lg p-3 border transition-colors ${
                ownedItems.has(shieldItem.id)
                  ? 'border-green-700/30 bg-green-900/10'
                  : 'border-slate-700/30 bg-slate-900/30 hover:bg-slate-900/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl flex-shrink-0 w-10 text-center">{shieldItem.icon}</div>
                <div className="flex-1 min-w-0">
                  <span className="text-white text-sm font-bold">{shieldItem.name}</span>
                  <p className="text-[10px] text-gray-500 mt-0.5">{shieldItem.description}</p>
                </div>
                <div className="flex-shrink-0">
                  {ownedItems.has(shieldItem.id) ? (
                    <span className="text-green-400 text-[10px] font-bold">所持中</span>
                  ) : (
                    <button
                      onClick={() => handleBuy(shieldItem)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                        socialPoints >= shieldItem.cost
                          ? 'border-amber-500/40 text-amber-300 hover:bg-amber-900/20'
                          : 'border-gray-700 text-gray-600 cursor-not-allowed'
                      }`}
                      disabled={socialPoints < shieldItem.cost}
                    >
                      {shieldItem.cost.toLocaleString()} MP
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* テーマタブ */}
          {tab === 'theme' && themeItems.map(item => {
            const owned = ownedItems.has(item.id);
            const applied = equippedTheme === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-lg p-3 border transition-colors ${
                  owned
                    ? 'border-green-700/30 bg-green-900/10'
                    : 'border-slate-700/30 bg-slate-900/30 hover:bg-slate-900/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl flex-shrink-0 w-10 text-center">{item.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-bold">{item.name}</span>
                      {applied && (
                        <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-bold">適用中</span>
                      )}
                    </div>
                    <p className="text-[10px] text-gray-500 mt-0.5">{item.description}</p>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-2">
                    {owned ? (
                      <button
                        onClick={() => onEquipTheme(applied ? null : item.id)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                          applied
                            ? 'border-gray-600 text-gray-400 hover:text-white'
                            : 'border-cyan-600/40 text-cyan-400 hover:bg-cyan-900/20'
                        }`}
                      >
                        {applied ? '解除' : '適用'}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBuy(item)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                          socialPoints >= item.cost
                            ? 'border-amber-500/40 text-amber-300 hover:bg-amber-900/20'
                            : 'border-gray-700 text-gray-600 cursor-not-allowed'
                        }`}
                        disabled={socialPoints < item.cost}
                      >
                        {item.cost.toLocaleString()} MP
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* 消耗品タブ */}
          {tab === 'consumable' && consumableItems.map(item => {
            const count = item.type === 'hint_token' ? hintTokens : 0;
            const canAfford = socialPoints >= item.cost;
            return (
              <div
                key={item.id}
                className="rounded-lg p-3 border border-slate-700/30 bg-slate-900/30 hover:bg-slate-900/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl flex-shrink-0 w-10 text-center">{item.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-bold">{item.name}</span>
                      {item.type === 'hint_token' && count > 0 && (
                        <span className="text-[9px] bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded font-bold">×{count}</span>
                      )}
                    </div>
                    <p className="text-[10px] text-gray-500 mt-0.5">{item.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => handleBuy(item)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                        canAfford
                          ? 'border-amber-500/40 text-amber-300 hover:bg-amber-900/20'
                          : 'border-gray-700 text-gray-600 cursor-not-allowed'
                      }`}
                      disabled={!canAfford}
                    >
                      {item.cost.toLocaleString()} MP
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-amber-900/20 bg-slate-900/40 flex-shrink-0">
          <p className="text-[9px] text-gray-600 text-center">
            称号はプレイヤー名の横に表示されます。消耗品は複数所持できます。
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemShop;
