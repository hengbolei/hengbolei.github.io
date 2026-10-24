---
title: 注意力机制：公式与代码示例
description: 一篇用于检查公式、代码与目录的演示文章。
date: 2026-10-24
updated: 2026-10-24
tags:
  - 示例
  - Transformer
---

> [!info] 功能示例
> 本文用于演示博客的公式、代码、目录和链接功能，并非正式论文精读或个人实验成果。

## 从一个问题出发

处理序列时，一个位置应该如何利用其他位置的信息？注意力机制通过查询与键的匹配，决定对不同值的加权程度。

## 缩放点积注意力

设查询、键和值分别为 $Q$、$K$、$V$，键向量维度为 $d_k$：

$$
\operatorname{Attention}(Q,K,V)=\operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V
$$

这里 softmax 沿键的位置维度进行。掩码可以限制某个查询可以访问的位置。

## 最小代码片段

下面只展示核心计算，未包含多头拆分、掩码与 dropout：

```python
import math
import torch

def attention(q, k, v):
    scores = q @ k.transpose(-2, -1) / math.sqrt(q.size(-1))
    weights = torch.softmax(scores, dim=-1)
    return weights @ v
```

## 阅读时保留的问题

- 缩放因子如何影响 softmax 的分布？
- 因果掩码改变了哪些信息路径？
- 多头机制与单头机制的表达有什么区别？

## 原始资料

公式来源：[Attention Is All You Need](https://arxiv.org/abs/1706.03762)。后续精读应结合原文核对实验和论证。

回到 [[topics|知识专题]]，或查看 [[papers|论文精读]]。
