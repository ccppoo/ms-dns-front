import { z } from 'zod';

import * as block from './_block';
import type { NestedListBlockSchemaType } from './_block/types';
import { documentBase } from './base';

// 글 쓰고 최종적으로 나오는 것

const outputBlockData = z.union([
  block.headerBlockSchema,
  block.nestedListBlockSchema,
  block.paragraphBlockSchema,
  block.imageBlockSchema,
]);

export type OutputBlockDataType = z.infer<typeof outputBlockData>;

const outputDataSchema = z.object({
  version: z.optional(z.string()),
  time: z.optional(z.number().nonnegative()),
  blocks: z.array(outputBlockData),
});

export const _outputDataSchema = z.object({
  data: outputDataSchema,
});

type OutputDataType = z.infer<typeof outputDataSchema>;

export type OutputDataSchemaType = z.input<typeof _outputDataSchema>;

const imageItem = z.object({
  url: z.string(),
});

export const boardPostMetadata = z.object({
  created_at: z.optional(z.union([z.date(), z.string()])), // 작성일
  updated_at: z.optional(z.union([z.date(), z.string()])), // 수정일
});

export const boardPostTitle = z.object({
  title: z.optional(z.string().default('')),
});

export type BoardPostTitle = z.infer<typeof boardPostTitle>;

export const boardPostCategory = z.object({
  category: z.optional(z.string()),
});

export const outputSchema = documentBase
  .merge(boardPostTitle)
  .merge(_outputDataSchema) // 본문
  .merge(boardPostMetadata);

const DEFAULT_INITIAL_DATA: OutputDataType = {
  blocks: [
    {
      type: 'header',
      data: {
        text: 'New note title...',
        level: 1,
      },
    },
  ],
};

export const outputSchemaDefault: OutputSchemaType = {
  id: undefined,
  // comments: 0,
  data: DEFAULT_INITIAL_DATA,
  created_at: undefined,
  updated_at: undefined,
  // vote: undefined,
  // user_id: undefined,
  title: '',
};

// 글쓰기 -> blob으로 일단 업로드 -> 글 작성시 백그라운드에서
// 1. 수정하고 최종으로 보낼 때
// 2. 최초 작성시 확정적으로 이미지 사용하는거 확인용
// added에 없는 경우 게시글 작성

type BoardEditFinal = {
  image: {
    deleted: string[];
    added: string[];
  };
};
// type BoardDataEditForm = OutputData & BoardEditFinal;

// // 읽을 때
// type BoardDataReadForm = OutputData;

export type OutputSchemaType = z.infer<typeof outputSchema>;

type boardPersonal = {
  saved: boolean; // 글 목록 저장 (레딧 save처럼)
  voted: 'up' | 'down'; // 회원인 경우 자신이 투표한 것
};
