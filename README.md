# tws_lp_jis60

ここに宣材画像

## About

WIP

## Concept

WIP

## How to Build

WIP

## Where to Get

(WIP) Booth shop

## License

このリポジトリは CC-BY-SA-4.0（Creative Commons Attribution-ShareAlike 4.0 International）でライセンスされています．

詳細は [LICENSE](./LICENSE) を参照してください.

### Third-Party Components

本プロジェクトは，以下の第三者ライブラリのコンポーネントを利用しています：

#### 1. OPL_Kicad_Library (CC-BY-SA-4.0)
- fork元: https://github.com/Seeed-Studio/OPL_Kicad_Library
- fork先: https://github.com/kim-xps12/OPL_Kicad_Library
- ライセンス: CC-BY-SA-4.0
- 変更ファイル: `XIAO-nRF52840-DIP.kicad_mod`（DRCシルク警告の修正）
- 利用箇所: [pcb_data/kicad_library/external/OPL_Kicad_Library](pcb_data/kicad_library/external/OPL_Kicad_Library)（submodule）

#### 2. KiCAD_FootPrint (MIT)
- fork元: https://github.com/Salicylic-acid3/KiCAD_FootPrint
- fork先: https://github.com/kim-xps12/KiCAD_FootPrint
- ライセンス: MIT
- 変更ファイル: `Diode_TH_SMD.kicad_mod`（DRCシルク警告の修正）
- 利用箇所: [pcb_data/kicad_library/external/KiCAD_FootPrint](pcb_data/kicad_library/external/KiCAD_FootPrint)（submodule）

#### 3. MX_V2 (MIT)
- fork元: https://github.com/ai03-2725/MX_V2
- 利用ディレクトリ:[custom-library.pretty](pcb_data/kicad_library/custom-library.pretty)
- ライセンス: MIT
- 派生物: `pcb_data/kicad_library/custom-library.pretty/`内のカスタムフットプリント
- 帰属表示: 当該ディレクトリ内の[LICENSE_MX_V2.txt](pcb_data/kicad_library/custom-library.pretty/LICENSE_MX_V2.txt)を参照

### Why CC-BY-SA-4.0？

本作のライセンスがCC-BY-SA-4.0である理由は，PCB設計ファイルにOPL_Kicad_Libraryから改変したフットプリントを組み込んでいるからです．CC-BY-SA-4.0のShareAlike条項により，派生物も同じCC-BY-SA-4.0ライセンスを継承する必要があります．

MITライセンスのコンポーネント（KiCAD_FootPrint，MX_V2）は，適切な帰属表示を維持することでCC-BY-SA-4.0と互換性があります．