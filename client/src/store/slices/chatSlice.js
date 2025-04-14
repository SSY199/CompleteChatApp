export const createChatSlice = (set,get) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessage: [],
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatMessage: (selectedChatMessage) => set({ selectedChatMessage }),
  closeChat: () => {
    set({ selectedChatData: undefined, selectedChatType: undefined, selectedChatMessage: [] });
  },
});