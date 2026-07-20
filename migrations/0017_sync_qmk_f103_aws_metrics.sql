-- 0017: 同步已確認的 QMK MCU 與 BitOGuard 儀表板數據至 D1。

UPDATE projects
SET zh = json_set(
  replace(replace(replace(replace(zh,
    'STM32F072 vs. Arduino Pro Micro（ATmega32U4）\n  F072 內建 USB FS 周邊，透過 BOOT0 腳直接進入 DFU 模式——一根 USB 線完成燒錄與使用，免去 ISP 燒錄器。',
    'STM32F103 vs. Arduino Pro Micro（ATmega32U4）\n  現有硬體使用 STM32F103，QMK 設定採 stm32duino bootloader。'),
    'STM32F072（內建 USB FS，支援 DFU 免燒錄器）', 'STM32F103（QMK 設定使用 stm32duino bootloader）'),
    'STM32F072 DFU 燒錄流程（BOOT0 腳位控制，免燒錄器）', 'STM32F103 搭配 stm32duino bootloader 的韌體燒錄流程'),
    'STM32 DFU 燒錄', 'STM32F103 bootloader 燒錄'),
  '$.description', '整合開源鍵盤 PCB 設計與 QMK/ChibiOS 韌體框架（STM32F103）。實際貢獻：識別開源框架與硬體間的編譯衝突及時序問題，以 LLM 輔助偵錯工具逆向工程 ChibiOS HAL 三件組（chconf/halconf/mcuconf），成功重構設定檔實現完整硬體功能——USB HID 穩定識別、RGB Matrix 運作正常、VIA/VIAL 即時改鍵驗證完成。',
  '$.tags[2]', 'USB HID · STM32duino'
),
en = json_set(
  replace(replace(replace(replace(en,
    'STM32F072 vs. Arduino Pro Micro (ATmega32U4):\n  F072 has built-in USB FS peripheral and enters DFU mode via BOOT0 pin — one USB cable handles both flashing and operation, no ISP programmer required.',
    'STM32F103 vs. Arduino Pro Micro (ATmega32U4):\n  The existing hardware uses STM32F103 and the QMK configuration uses the stm32duino bootloader.'),
    'STM32F072 (built-in USB FS, DFU bootloader, no programmer needed)', 'STM32F103 (QMK uses the stm32duino bootloader)'),
    'STM32F072 DFU flashing flow (BOOT0 pin control, no programmer needed)', 'STM32F103 flashing flow using the stm32duino bootloader'),
    'STM32 DFU flashing', 'STM32F103 bootloader flashing'),
  '$.description', 'Integrated an open-source PCB layout with the QMK/ChibiOS firmware framework on STM32F103. Real engineering contribution: identified compilation and timing conflicts between the open-source framework and the hardware, reverse-engineered ChibiOS HAL triple-config (chconf/halconf/mcuconf) with LLM-assisted debugging, and restructured configuration files to achieve 100% hardware functionality — USB HID stable, RGB Matrix operational, VIA/VIAL live keymap verified.',
  '$.tags[2]', 'USB HID · STM32duino'
)
WHERE id = 'qmk-stm32-keyboard';

UPDATE projects
SET zh = json_set(zh,
  '$.detail.outcome', '【模型效能（儀表板版本）】\n・AUC：83.2%\n・Precision：27.5%\n・Recall：33.2%\n・F1 Score：30.1%\n・Accuracy：95.0%\n・標記為風險帳戶：501 / 12,753\n\n這組數字來自已部署的 BitoGuard 儀表板；Accuracy 受資料不平衡影響，不單獨作為模型好壞的判斷。Precision 與 Recall 一起呈現，讓誤報成本和找出風險帳戶的能力都能被看見。'),
    en = json_set(en,
  '$.detail.outcome', '[Model Performance — Dashboard Version]\n- AUC: 83.2%\n- Precision: 27.5%\n- Recall: 33.2%\n- F1 Score: 30.1%\n- Accuracy: 95.0%\n- Accounts flagged as risky: 501 / 12,753\n\nThese figures come from the deployed BitoGuard dashboard. Accuracy is affected by class imbalance, so it is not used alone to judge the model; precision and recall are presented together to show both false-positive cost and risk-account coverage.')
WHERE id = 'aws-hackathon';
